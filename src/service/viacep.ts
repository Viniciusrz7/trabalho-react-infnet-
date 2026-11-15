export interface EnderecoResponse {
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    erro?: string
}

let controller: AbortController

export const getEndereco = async (cep: string) => {
    if (controller) {
        controller.abort()
    }

    controller = new AbortController()
    const signal = controller.signal

    const response = await Promise.race([
        fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal }),
        new Promise<Response>((_, reject) => {
            setTimeout(() => reject(new Error("A consulta do CEP demorou demais, tente novamente")), 8000)
        }),
    ])

    const endereco: EnderecoResponse = await response.json()

    if ("erro" in endereco) {
        throw new Error(`CEP ${cep} não encontrado`)
    }

    return endereco
}
