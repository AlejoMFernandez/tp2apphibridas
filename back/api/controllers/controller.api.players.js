import * as service from "../../services/players.service.js"

export function getPlayers(req, res){
    const filtros = req.query
    service.getPlayers(filtros)
        .then(players => players.length > 0 
            ? res.status(200).json(players)
            : res.status(404).json({message: "No se encontraron jugadores"})
        )
        .catch(err => res.status(500).json({message: "Error al obtener jugadores"}))
}

export function getPlayerById(req, res){
    const id = req.params.id
    service.getPlayerById(id)
        .then(player => player 
            ? res.status(200).json(player)
            : res.status(404).json({message: "Jugador no encontrado"})
        )
        .catch(err => res.status(500).json({message: "Error al obtener jugador"}))
}

export function nuevoPlayer(req, res){
    const player = {
        id: req.body.id,
        name: req.body.name,
        cname: req.body.cname,
        role: req.body.role,
        nationality: req.body.nationality,
        age: req.body.age,
        height: req.body.height,
        foot: req.body.foot,
        createdAt: new Date(),
        createdBy: req.usuario._id
    }
    service.guardarPlayer(player)
        .then((playerNuevo) => res.status(201).json(playerNuevo))
        .catch((err) => res.status(500).json({message: "No se pudo guardar el jugador"}))
}

export function eliminarPlayer(req, res){
    const id = req.params.id
    service.eliminarPlayer(id)
        .then(() => res.status(202).json({message: `Jugador eliminado correctamente id: ${id}`}))
        .catch((err) => res.status(500).json({message: "No se pudo eliminar el jugador"}))
}

export function editarPlayer(req, res){
    const id = req.params.id
    service.editarPlayer(id, req.body)        
        .then(() => res.status(202).json({message: "Jugador actualizado correctamente"}))
        .catch((err) => res.status(500).json({message: "No se pudo actualizar el jugador"}))
}

export function reemplazarPlayer(req, res){
    const id = req.params.id
    const player = {
        id: req.body.id,
        name: req.body.name,
        cname: req.body.cname,
        role: req.body.role,
        nationality: req.body.nationality,
        age: req.body.age,
        height: req.body.height,
        foot: req.body.foot
    }
    service.reemplazarPlayer(id, player)        
        .then(() => res.status(202).json({message: "Jugador reemplazado correctamente"}))
        .catch((err) => res.status(500).json({message: "No se pudo reemplazar el jugador"}))
}
