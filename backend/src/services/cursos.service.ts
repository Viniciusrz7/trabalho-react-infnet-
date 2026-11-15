import * as cursosRepository from "../repositories/cursos.repository.js"
import type { Curso } from "../utils/types.js"

export function listar(): Curso[] {
    return cursosRepository.listar()
}
