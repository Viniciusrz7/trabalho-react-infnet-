import { LRUCache } from "lru-cache"
import * as cursosRepository from "../repositories/cursos.repository.js"
import type { Curso } from "../utils/types.js"

const options = {
    max: 500,
    ttl: 1000 * 60 * 5,
}

const listaCache = new LRUCache<string, Curso[]>(options)

export function listar(): Curso[] {
    const emCache = listaCache.get("cursos")

    if (emCache) {
        return emCache
    }

    const cursos = cursosRepository.listar()
    listaCache.set("cursos", cursos)

    return cursos
}
