import express from "express"
import { atualizar, buscar, criar, excluir, listar } from "../controllers/alunos.controller.js"
import { AppError } from "../errors/AppError.js"
import { verificarToken } from "../middlewares/JWT/verificarToken.js"

const router = express.Router()

router.use(verificarToken)

router.param("id", (req, res, next, id) => {
    res.locals.id = parseInt(id, 10)

    if (isNaN(res.locals.id)) {
        next(new AppError("ID_INVALIDO", "ID inválido"))
    } else {
        next()
    }
})

router.get("/", listar)
router.get("/:id", buscar)
router.post("/", criar)
router.put("/:id", atualizar)
router.delete("/:id", excluir)

export default router
