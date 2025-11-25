import * as service from "../../services/teams.service.js"

export function getTeams(req, res){
    const filtros = req.query
    service.getTeams(filtros)
        .then(teams => teams.length > 0 
            ? res.status(200).json(teams)
            : res.status(404).json({message: "No se encontraron equipos"})
        )
        .catch(err => res.status(500).json({message: "Error al obtener equipos"}))
}

export function getTeamById(req, res){
    const id = req.params.id
    service.getTeamById(id)
        .then(team => team 
            ? res.status(200).json(team)
            : res.status(404).json({message: "Equipo no encontrado"})
        )
        .catch(err => res.status(500).json({message: "Error al obtener equipo"}))
}

export function nuevoTeam(req, res){
    const team = {
        name: req.body.name,
        shortName: req.body.shortName,
        logo: req.body.logo,
        stadium: req.body.stadium,
        country: req.body.country,
        founded: req.body.founded,
        squad: req.body.squad || [],
        createdAt: new Date(),
        createdBy: req.usuario._id
    }
    service.guardarTeam(team)
        .then((teamNuevo) => res.status(201).json(teamNuevo))
        .catch((err) => res.status(500).json({message: "No se pudo guardar el equipo"}))
}

export function eliminarTeam(req, res){
    const id = req.params.id
    service.eliminarTeam(id)
        .then(() => res.status(202).json({message: `Equipo eliminado correctamente id: ${id}`}))
        .catch((err) => res.status(500).json({message: "No se pudo eliminar el equipo"}))
}

export function editarTeam(req, res){
    const id = req.params.id
    service.editarTeam(id, req.body)        
        .then(() => res.status(202).json({message: "Equipo actualizado correctamente"}))
        .catch((err) => res.status(500).json({message: "No se pudo actualizar el equipo"}))
}

export function reemplazarTeam(req, res){
    const id = req.params.id
    const team = {
        name: req.body.name,
        shortName: req.body.shortName,
        logo: req.body.logo,
        stadium: req.body.stadium,
        country: req.body.country,
        founded: req.body.founded,
        squad: req.body.squad || []
    }
    service.reemplazarTeam(id, team)        
        .then(() => res.status(202).json({message: "Equipo reemplazado correctamente"}))
        .catch((err) => res.status(500).json({message: "No se pudo reemplazar el equipo"}))
}
