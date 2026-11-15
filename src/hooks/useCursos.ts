import { useEffect, useState } from "react"
import { api } from "../service/api"
import type { CursoResponse } from "../pages/home/types"
import { toastError } from "../utils/toast"

interface ListaCursosResponse {
    cursos: Array<CursoResponse>
}

export function useCursos() {

    const [cursos, setCursos] = useState<CursoResponse[]>([])

    useEffect(() => {
        async function getCursos() {
            try {
                const response = await api.get<ListaCursosResponse>('/cursos')

                if (!ignore) {
                    setCursos(response.data.cursos)
                }
            } catch {
                if (!ignore) {
                    toastError("Erro ao carregar os cursos")
                }
            }
        }

        let ignore = false
        getCursos()

        return () => {
            ignore = true
        }
    }, [])

    return { cursos }
}
