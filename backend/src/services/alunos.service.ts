import { LRUCache } from "lru-cache"
import { AppError } from "../errors/AppError.js"
import * as alunosRepository from "../repositories/alunos.repository.js"
import type { Aluno, DadosAluno } from "../utils/types.js"

const options = {
    max: 500,
    ttl: 1000 * 60 * 5,
}

const listaCache = new LRUCache<string, Aluno[]>(options)
const alunoCache = new LRUCache<number, Aluno>(options)

export function listar(): Aluno[] {
    const emCache = listaCache.get("alunos")

    if (emCache) {
        return emCache
    }

    const alunos = alunosRepository.listar()
    listaCache.set("alunos", alunos)

    return alunos
}

export function buscar(id: number): Aluno {
    const emCache = alunoCache.get(id)

    if (emCache) {
        return emCache
    }

    const aluno = alunosRepository.buscarPorId(id)

    if (!aluno) {
        throw new AppError("NAO_ENCONTRADO", "Aluno não encontrado")
    }

    alunoCache.set(id, aluno)

    return aluno
}

export function criar(dados: DadosAluno): Aluno {
    const existente = alunosRepository.buscarPorEmail(dados.email)

    if (existente) {
        throw new AppError("EMAIL_DUPLICADO", "Já existe um aluno com este e-mail")
    }

    const aluno = alunosRepository.criar(dados)
    listaCache.delete("alunos")

    return aluno
}

export function atualizar(id: number, dados: DadosAluno): Aluno {
    const existente = alunosRepository.buscarPorEmail(dados.email)

    if (existente && existente.id !== id) {
        throw new AppError("EMAIL_DUPLICADO", "Já existe um aluno com este e-mail")
    }

    const aluno = alunosRepository.atualizar(id, dados)

    if (!aluno) {
        throw new AppError("NAO_ENCONTRADO", "Aluno não encontrado")
    }

    alunoCache.delete(id)
    listaCache.delete("alunos")

    return aluno
}

export function excluir(id: number): void {
    const excluido = alunosRepository.excluir(id)

    if (!excluido) {
        throw new AppError("NAO_ENCONTRADO", "Aluno não encontrado")
    }

    alunoCache.delete(id)
    listaCache.delete("alunos")
}
