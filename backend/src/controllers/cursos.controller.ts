import type { Request, Response } from "express"
import * as cursosService from "../services/cursos.service.js"
import type { Curso } from "../utils/types.js"

export function listar(req: Request, res: Response<{ cursos: Curso[] }>) {
    res.json({ cursos: cursosService.listar() })
}
