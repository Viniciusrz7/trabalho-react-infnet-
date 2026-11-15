export interface EnderecoResponse {
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    erro?: string
}

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const tempoLimite = async (ms: number): Promise<never> => {
    await esperar(ms)
    throw new Error("A consulta do CEP demorou demais, tente novamente")
}

export const getEndereco = async (cep: string, controller: AbortController) => {
    try {
        const response = await Promise.race([
            fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal }),
            tempoLimite(8000)
        ])

        if (!response.ok) {
            throw new Error("Não foi possível consultar o CEP")
        }

        const endereco: EnderecoResponse = await response.json()

        if (endereco.erro) {
            throw new Error(`CEP ${cep} não encontrado`)
        }

        return endereco
    } catch (error) {
        controller.abort()
        throw error
    }
}
