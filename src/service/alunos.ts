import { api } from "./api"
import type { AlunoResponse } from "../pages/home/types"
import type { FormAluno } from "../components/AlunoForm"

interface ListaAlunosResponse {
    alunos: Array<AlunoResponse>
}

export const getAlunos = async () => (await api.get<ListaAlunosResponse>('/alunos')).data

export const postAluno = async ({ nome, email, telefone, curso, cep, logradouro, bairro, cidade, uf }: FormAluno) => {
    return (await api.post<AlunoResponse>('/alunos', { nome, email, telefone, curso, cep, logradouro, bairro, cidade, uf })).data
}
