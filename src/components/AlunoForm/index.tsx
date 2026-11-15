import "./styles.css"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaValidation } from "../../schemas/alunos.schema"
import TextField from "@mui/material/TextField"
import Botao from "../Botao"
import { getEndereco } from "../../service/viacep"
import type { EnderecoResponse } from "../../service/viacep"
import type { CursoResponse } from "../../pages/home/types"

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

    const { register, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm({ resolver: yupResolver(schemaValidation), defaultValues: aluno })

    useEffect(() => {
        if (aluno && cursos.length) {
            setValue("curso", aluno.curso)
        }
    }, [aluno, cursos, setValue])

    function preencherEndereco(endereco: EnderecoResponse) {
        clearErrors("cep")
        setValue("logradouro", endereco.logradouro, { shouldValidate: true })
        setValue("bairro", endereco.bairro, { shouldValidate: true })
        setValue("cidade", endereco.localidade, { shouldValidate: true })
        setValue("uf", endereco.uf, { shouldValidate: true })
    }

    async function buscarEndereco(cep: string) {
        const cepLimpo = cep.replace(/\D/g, "")
        if (cepLimpo.length !== 8) {
            return
        }

        try {
            const endereco = await getEndereco(cepLimpo)
            preencherEndereco(endereco)
        } catch (error) {
            if (error instanceof Error && error.name !== "AbortError") {
                setError("cep", { message: error.message })
            }
        }
    }

    return (
        <form className="aluno-form" onSubmit={handleSubmit(saveAluno)}>
            <TextField label="Nome" size="small" error={Boolean(errors.nome)} helperText={errors.nome?.message}
                slotProps={{ inputLabel: { shrink: true } }} {...register("nome")} />
            <TextField label="E-mail" size="small" error={Boolean(errors.email)} helperText={errors.email?.message}
                slotProps={{ inputLabel: { shrink: true } }} {...register("email")} />
            <div className="aluno-form-linha">
                <TextField label="Telefone" size="small" fullWidth error={Boolean(errors.telefone)} helperText={errors.telefone?.message}
                    slotProps={{ inputLabel: { shrink: true } }} {...register("telefone")} />
                <TextField select label="Curso" size="small" fullWidth error={Boolean(errors.curso)} helperText={errors.curso?.message}
                    slotProps={{ select: { native: true }, inputLabel: { shrink: true } }} {...register("curso")}>
                    <option value="">Selecione um curso</option>
                    {cursos.map((curso) => <option key={curso.id} value={curso.nome}>{curso.nome}</option>)}
                </TextField>
            </div>
            <TextField label="CEP" size="small" error={Boolean(errors.cep)}
                helperText={errors.cep ? errors.cep.message : "Digite o CEP para preencher o endereço"}
                slotProps={{ inputLabel: { shrink: true } }} {...register("cep", { onChange: (evento) => buscarEndereco(evento.target.value) })} />
            <TextField label="Logradouro" size="small" error={Boolean(errors.logradouro)} helperText={errors.logradouro?.message}
                slotProps={{ inputLabel: { shrink: true } }} {...register("logradouro")} />
            <div className="aluno-form-linha">
                <TextField label="Bairro" size="small" fullWidth error={Boolean(errors.bairro)} helperText={errors.bairro?.message}
                    slotProps={{ inputLabel: { shrink: true } }} {...register("bairro")} />
                <TextField label="Cidade" size="small" fullWidth error={Boolean(errors.cidade)} helperText={errors.cidade?.message}
                    slotProps={{ inputLabel: { shrink: true } }} {...register("cidade")} />
                <TextField label="UF" size="small" error={Boolean(errors.uf)} helperText={errors.uf?.message}
                    slotProps={{ inputLabel: { shrink: true }, htmlInput: { maxLength: 2 } }} {...register("uf")} />
            </div>
            {isPending && <p>Salvando...</p>}
            <Botao texto="Salvar" type="submit" disabled={isPending} />
        </form>
    )
}