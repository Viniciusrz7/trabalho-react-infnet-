import * as z from "zod"

export const AlunoBody = z.object({
    nome: z.string().trim().min(3),
    email: z.email(),
    telefone: z.string().trim().min(8),
    curso: z.string().trim().min(1),
    cep: z.string().regex(/^\d{5}-?\d{3}$/),
    logradouro: z.string().trim().min(1),
    bairro: z.string().trim().min(1),
    cidade: z.string().trim().min(1),
    uf: z.string().trim().length(2),
})
