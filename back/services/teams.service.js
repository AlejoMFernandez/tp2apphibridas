import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin123@goaldemy.jaqeums.mongodb.net")
const db = client.db("data")

export async function getTeams(filter = {}) {
    const filterMongo = { eliminado: { $ne: true } }

    if (filter.name != undefined) {
        filterMongo.name = { $regex: filter.name, $options: 'i' }
    }

    await client.connect()
    return db.collection("teamsANDplayers").find(filterMongo).toArray()
}

export async function getTeamById(_id) {
    await client.connect()
    return db.collection("teamsANDplayers").findOne({ _id: new ObjectId(_id) })
}

export async function guardarTeam(team) {
    await client.connect()
    const result = await db.collection("teamsANDplayers").insertOne(team)
    return { ...team, _id: result.insertedId }
}

export function editarTeam(id, team) {
    return db.collection("teamsANDplayers").updateOne(
        { _id: new ObjectId(id) }, 
        { $set: team }
    )
}

export function eliminarTeam(id) {
    // Soft delete
    return db.collection("teamsANDplayers").updateOne(
        { _id: new ObjectId(id) }, 
        { $set: { eliminado: true } }
    )
}

export function reemplazarTeam(id, team) {
    return db.collection("teamsANDplayers").replaceOne(
        { _id: new ObjectId(id) }, 
        team
    )
}
