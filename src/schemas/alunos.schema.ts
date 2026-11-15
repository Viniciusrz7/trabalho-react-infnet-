import * as yup from "yup"

export const schemaValidation = yup.object({
    nome: yup.string().required("O nome do aluno é obrigatório").min(3, "O nome deve ter pelo menos 3 letras"),
    email: yup.string().required("O e-mail do aluno é obrigatório").email("O e-mail informado não é válido"),
    telefone: yup.string().required("O telefone do aluno é obrigatório").min(8, "O telefone deve ter pelo menos 8 números"),
    curso: yup.string().required("O curso do aluno é obrigatório"),
    cep: yup.string().required("O CEP do aluno é obrigatório").matches(/^\d{5}-?\d{3}$/, "O CEP deve ter 8 números"),
    logradouro: yup.string().required("O logradouro é obrigatório"),
    bairro: yup.string().required("O bairro é obrigatório"),
    cidade: yup.string().required("A cidade é obrigatória"),
    uf: yup.string().required("A UF é obrigatória").length(2, "A UF deve ter 2 letras"),
})
