export interface EnderecoResponse {
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    erro?: string
}

const tempoLimite = () => {
    return new Promise<Response>((_, reject) => {
        setTimeout(() => reject(new Error("A consulta do CEP demorou demais, tente novamente")), 8000)
    })
}

export const getEndereco = async (cep: string, signal: AbortSignal) => {
    const response = await Promise.race([fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: signal }), tempoLimite()])
    const endereco: EnderecoResponse = await response.json()

    if (endereco.erro) {
        throw new Error(`CEP ${cep} não encontrado`)
    }

    return endereco
}
