import { alunos } from "../data/index.js"
import type { Aluno, DadosAluno } from "../utils/types.js"

// o próximo id continua do maior id que veio do JSON e nunca é reaproveitado
let proximoId = alunos.reduce((maior, aluno) => Math.max(maior, aluno.id), 0) + 1

export function listar(): Aluno[] {
    return alunos
}

export function buscarPorId(id: number): Aluno | undefined {
    return alunos.find((aluno) => aluno.id === id)
}

export function buscarPorEmail(email: string): Aluno | undefined {
    return alunos.find((aluno) => aluno.email === email)
}

export function criar(dados: DadosAluno): Aluno {
    const aluno: Aluno = { id: proximoId, ...dados }

    proximoId = proximoId + 1
    alunos.push(aluno)

    return aluno
}

export function atualizar(id: number, dados: DadosAluno): Aluno | undefined {
    const indice = alunos.findIndex((aluno) => aluno.id === id)

    if (indice === -1) {
        return undefined
    }

    const aluno: Aluno = { id, ...dados }
    alunos[indice] = aluno

    return aluno
}

export function excluir(id: number): boolean {
    const indice = alunos.findIndex((aluno) => aluno.id === id)

    if (indice === -1) {
        return false
    }

    alunos.splice(indice, 1)
    return true
}
