import { useEffect, useState } from "react"
import { getCursos } from "../service/cursos"
import type { CursoResponse } from "../pages/home/types"
import { toastError } from "../utils/toast"

export function useCursos() {

    const [cursos, setCursos] = useState<CursoResponse[]>([])

    useEffect(() => {
        async function loadCursos() {
            try {
                const data = await getCursos()
                setCursos(data.cursos)
            } catch {
                toastError("Erro ao carregar os cursos")
            }
        }
        loadCursos()
    }, [])
    return { cursos }
}
