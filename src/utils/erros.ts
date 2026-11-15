import axios from "axios"

export const getMensagemErro = (error: unknown) => {
    if (axios.isAxiosError<{ erro: string }>(error) && error.response) {
        return error.response.data.erro ?? `Erro ${error.response.status} no servidor`
    }

    return "Não foi possível conectar ao servidor"
}
