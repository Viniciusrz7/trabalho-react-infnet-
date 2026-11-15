import axios from "axios"

export function getMensagemErro(error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
        return error.response.data.erro
    }

    return "Não foi possível conectar ao servidor"
}
