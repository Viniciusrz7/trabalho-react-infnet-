import { api } from "./api"
import type { CursoResponse } from "../pages/home/types"

interface ListaCursosResponse {
    cursos: Array<CursoResponse>
}

export const getCursos = async () => (await api.get<ListaCursosResponse>('/cursos')).data
