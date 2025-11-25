import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import { createToken } from "./token.service.js"

const client = new MongoClient("mongodb+srv://admin:admin123@goaldemy.jaqeums.mongodb.net")
const db = client.db("data")

export async function createUser(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error("El usuario ya existe")

    const nuevoUsuario = { 
        ...usuario, 
        password: undefined, 
        passwordConfirm: undefined,
        createdAt: new Date()
    }
    nuevoUsuario.password = await bcrypt.hash(usuario.password, 10)
    await db.collection("usuarios").insertOne(nuevoUsuario)

    return { ...nuevoUsuario, password: undefined }
}

export async function login(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!existe) throw new Error("Credenciales inválidas")

    const esValido = await bcrypt.compare(usuario.password, existe.password)

    if (!esValido) throw new Error("Credenciales inválidas")

    const token = await createToken(existe)

    return { ...existe, password: undefined, passwordConfirm: undefined, token }
}
