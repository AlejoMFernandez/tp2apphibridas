import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin123@goaldemy.jaqeums.mongodb.net")
const db = client.db("data")

// Función utilitaria para obtener la URL de la imagen del jugador
function getPlayerImageUrl(playerId) {
    return `https://images.fotmob.com/image_resources/playerimages/${playerId}.png`
}

// Traer todos los jugadores, con filtro opcional por club
export async function getPlayers(filter = {}) {
    const filterMongo = {}

    // Filtrar por club
    if (filter.club != undefined) {
        filterMongo["name"] = { $eq: filter.club }
    }

    await client.connect()
    const clubes = await db.collection("teamsANDplayers").find(filterMongo).toArray()

    // Array para todos los jugadores
    const jugadores = []

    clubes.forEach(club => {
        if (Array.isArray(club.squad)) {
            club.squad.forEach(posicion => {
                if (Array.isArray(posicion.members)) {
                    posicion.members.forEach(member => {
                        jugadores.push({
                            ...member,
                            club: club.name,
                            clubId: club.id,
                            clubShortName: club.shortName,
                            clubLogo: club.logo,
                            posicion: posicion.title,
                            imgUrl: getPlayerImageUrl(member.id),
                            imgFallbackUrl: club.logo
                        })
                    })
                }
            })
        }
    })

    return jugadores
}

// Traer jugador por ID interno (no ObjectId de MongoDB)
export async function getPlayerById(jugadorId) {
    await client.connect()
    const clubes = await db.collection("teamsANDplayers").find({}).toArray()
    
    for (const club of clubes) {
        if (Array.isArray(club.squad)) {
            for (const posicion of club.squad) {
                if (Array.isArray(posicion.members)) {
                    for (const member of posicion.members) {
                        if (String(member.id) === String(jugadorId)) {
                            return {
                                ...member,
                                club: club.name,
                                clubId: club.id,
                                clubShortName: club.shortName,
                                clubLogo: club.logo,
                                posicion: posicion.title,
                                imgUrl: getPlayerImageUrl(member.id),
                                imgFallbackUrl: club.logo
                            }
                        }
                    }
                }
            }
        }
    }
    return null
}

// Guardar nuevo jugador 
export async function guardarPlayer(jugador) {
    await client.connect()
    // Aquí deberías agregar el jugador a un equipo específico
    return db.collection("teamsANDplayers").insertOne(jugador)
}

// Editar jugador
export function editarPlayer(id, jugador) {
    return db.collection("teamsANDplayers").updateOne(
        { _id: new ObjectId(id) }, 
        { $set: jugador }
    )
}

// Eliminar jugador (soft delete)
export function eliminarPlayer(id) {
    return db.collection("teamsANDplayers").updateOne(
        { _id: new ObjectId(id) }, 
        { $set: { eliminado: true } }
    )
}

// Reemplazar jugador por ID
export function reemplazarPlayer(id, jugador) {
    return db.collection("teamsANDplayers").replaceOne(
        { _id: new ObjectId(id) }, 
        jugador
    )
}
