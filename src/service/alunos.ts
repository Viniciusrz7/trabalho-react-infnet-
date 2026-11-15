import { api } from "./api"
import type { AlunoResponse } from "../pages/home/types"

interface ListaAlunosResponse {
    alunos: Array<AlunoResponse>
}

export const getAlunos = async () => (await api.get<ListaAlunosResponse>('/alunos')).data
