import "./styles.css"
import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import TextField from "@mui/material/TextField"
import Botao from "../Botao"
import { getEndereco } from "../../service/viacep"
import type { CursoResponse } from "../../pages/home/types"

const schemaValidation = yup.object({
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

export interface FormAluno {
    "nome": string;
    "email": string;
    "telefone": string;
    "curso": string;
    "cep": string;
    "logradouro": string;
    "bairro": string;
    "cidade": string;
    "uf": string;
}

interface AlunoFormProps {
    aluno?: FormAluno
    cursos: CursoResponse[]
    isPending: boolean
    saveAluno: (values: FormAluno) => void
}

export default function AlunoForm({ aluno, cursos, isPending, saveAluno }: AlunoFormProps) {

    const { register, handleSubmit, setValue, setError, clearErrors, control, formState: { errors } } = useForm({ resolver: yupResolver(schemaValidation), defaultValues: aluno })
    const cep = useWatch({ control, name: "cep" })

    useEffect(() => {
        if (aluno && cursos.length) {
            setValue("curso", aluno.curso)
        }
    }, [aluno, cursos, setValue])

    useEffect(() => {
        const cepLimpo = cep ? cep.replace(/\D/g, "") : ""

        if (cepLimpo.length !== 8 || cep === aluno?.cep) {
            return
        }

        const controller = new AbortController()

        async function buscarEndereco() {
            try {
                const endereco = await getEndereco(cepLimpo, controller.signal)

                clearErrors("cep")
                setValue("logradouro", endereco.logradouro, { shouldValidate: true })
                setValue("bairro", endereco.bairro, { shouldValidate: true })
                setValue("cidade", endereco.localidade, { shouldValidate: true })
                setValue("uf", endereco.uf, { shouldValidate: true })
            } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
                    setError("cep", { message: error.message })
                }
            }
        }

        buscarEndereco()

        return () => {
            controller.abort()
        }
    }, [cep, aluno, setValue, setError, clearErrors])

    return (
        <form className="aluno-form" onSubmit={handleSubmit(saveAluno)}>
            <TextField label="Nome" size="small" error={!!errors.nome} helperText={errors.nome?.message}
                slotProps={{ inputLabel: { shrink: true } }} {...register("nome")} />
            <TextField label="E-mail" size="small" error={!!errors.email} helperText={errors.email?.message}
                slotProps={{ inputLabel: { shrink: true } }} {...register("email")} />
            <div className="aluno-form-linha">
                <TextField label="Telefone" size="small" fullWidth error={!!errors.telefone} helperText={errors.telefone?.message}
                    slotProps={{ inputLabel: { shrink: true } }} {...register("telefone")} />
                <TextField select label="Curso" size="small" fullWidth error={!!errors.curso} helperText={errors.curso?.message}
                    slotProps={{ select: { native: true }, inputLabel: { shrink: true } }} {...register("curso")}>
                    <option value="">Selecione um curso</option>
                    {cursos.map((curso) => <option key={curso.id} value={curso.nome}>{curso.nome}</option>)}
                </TextField>
            </div>
            <TextField label="CEP" size="small" error={!!errors.cep}
                helperText={errors.cep ? errors.cep.message : "Digite o CEP para preencher o endereço"}
                slotProps={{ inputLabel: { shrink: true } }} {...register("cep")} />
            <TextField label="Logradouro" size="small" error={!!errors.logradouro} helperText={errors.logradouro?.message}
                slotProps={{ inputLabel: { shrink: true } }} {...register("logradouro")} />
            <div className="aluno-form-linha">
                <TextField label="Bairro" size="small" fullWidth error={!!errors.bairro} helperText={errors.bairro?.message}
                    slotProps={{ inputLabel: { shrink: true } }} {...register("bairro")} />
                <TextField label="Cidade" size="small" fullWidth error={!!errors.cidade} helperText={errors.cidade?.message}
                    slotProps={{ inputLabel: { shrink: true } }} {...register("cidade")} />
                <TextField label="UF" size="small" error={!!errors.uf} helperText={errors.uf?.message}
                    slotProps={{ inputLabel: { shrink: true }, htmlInput: { maxLength: 2 } }} {...register("uf")} />
            </div>
            {isPending && <p>Salvando...</p>}
            <Botao texto="Salvar" type="submit" disabled={isPending} />
        </form>
    )
}