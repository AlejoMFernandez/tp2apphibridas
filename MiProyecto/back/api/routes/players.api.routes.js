import { Router } from "express";
import * as controllers from "../controllers/controller.api.players.js"
import { validateToken } from "../../middleware/token.validate.middleware.js";

const route = Router()

route.get("/", [validateToken], controllers.getPlayers)
route.get("/:id", [validateToken], controllers.getPlayerById)
route.post("/", [validateToken], controllers.nuevoPlayer)
route.delete("/:id", [validateToken], controllers.eliminarPlayer)
route.patch("/:id", [validateToken], controllers.editarPlayer)
route.put("/:id", [validateToken], controllers.reemplazarPlayer)

export default route
