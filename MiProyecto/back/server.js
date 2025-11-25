import express from "express"
import TeamsApiRouter from "./api/routes/teams.api.routes.js"
import PlayersApiRouter from "./api/routes/players.api.routes.js"
import UsuariosApiRouter from './api/routes/usuarios.routes.js'
import cors from 'cors'

const app = express()

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET, POST, PUT, PATCH, DELETE"
}

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/teams", TeamsApiRouter)
app.use("/api/players", PlayersApiRouter)
app.use("/api/usuarios", UsuariosApiRouter)

app.listen(2025, () => {
    console.log("GOALDEMY Backend funcionando en el puerto 2025")
})
