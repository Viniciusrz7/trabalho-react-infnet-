export interface Aluno {
    id: number
    nome: string
    email: string
    telefone: string
    curso: string
    cep: string
    logradouro: string
    bairro: string
    cidade: string
    uf: string
}

export type DadosAluno = Omit<Aluno, "id">

export interface Curso {
    id: number
    nome: string
}

export interface Usuario {
    id: number
    nome: string
    email: string
    passwordHash: string
}

export interface LoginResposta {
    token: string
    usuario: Omit<Usuario, "passwordHash">
}

export interface ErroResposta {
    erro: string
}
