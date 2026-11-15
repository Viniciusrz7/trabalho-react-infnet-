import { cursos } from "../data/index.js"
import type { Curso } from "../utils/types.js"

export function listar(): Curso[] {
    return cursos
}
