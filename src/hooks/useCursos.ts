import { useEffect, useState } from "react"
import axios from "axios"
import { api } from "../service/api"
import type { CursoResponse } from "../pages/home/types"

interface ListaCursosResponse {
    cursos: Array<CursoResponse>
}

export function useCursos() {

    const [cursos, setCursos] = useState<CursoResponse[]>([])
    const [erro, setErro] = useState("")

    useEffect(() => {
        const controller = new AbortController()

        api.get<ListaCursosResponse>('/cursos', { signal: controller.signal })
            .then((response) => {
                setCursos(response.data.cursos)
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    setErro("Erro ao carregar os cursos")
                }
            })

        return () => {
            controller.abort()
        }
    }, [])

    return { cursos, erro }
}
