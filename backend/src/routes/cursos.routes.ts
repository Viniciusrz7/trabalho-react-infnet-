import express from "express"
import { listar } from "../controllers/cursos.controller.js"
import { verificarToken } from "../middlewares/JWT/verificarToken.js"

const router = express.Router()

router.use(verificarToken)

router.get("/", listar)

export default router
