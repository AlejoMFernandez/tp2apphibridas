import { Router } from "express";
import * as controllers from "../controllers/controller.api.teams.js"
import { validateToken } from "../../middleware/token.validate.middleware.js";

const route = Router()

route.get("/", [validateToken], controllers.getTeams)
route.get("/:id", [validateToken], controllers.getTeamById)
route.post("/", [validateToken], controllers.nuevoTeam)
route.delete("/:id", [validateToken], controllers.eliminarTeam)
route.patch("/:id", [validateToken], controllers.editarTeam)
route.put("/:id", [validateToken], controllers.reemplazarTeam)

export default route
