import Container from "../../templates/container"
import { useNavigate, useParams } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import "./styles.css"
import { useDispatch } from "react-redux"
import { updatePresenca } from "../../store/presencaSlice"
import Alert from "@mui/material/Alert"
import AlunoForm from "../../components/AlunoForm"
import type { FormAluno } from "../../components/AlunoForm"
import Botao from "../../components/Botao"
import { useCursos } from "../../hooks/useCursos"
import { getAlunoDetalhe, putAluno } from "../../service/alunos"
import { toastError, toastSuccess } from "../../utils/toast"
import { getMensagemErro } from "../../utils/erros"

export default function Editar() {

    const params = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const { cursos } = useCursos()
    const id = Number(params.id)

    const query = useQuery({ queryKey: ['aluno', id], queryFn: () => getAlunoDetalhe(id), staleTime: 1000 * 60 * 5, retry: false })

    const mutate = useMutation({
        mutationFn: putAluno, onSuccess: ({ nome, curso }) => {
            toastSuccess("Aluno atualizado com sucesso")
            dispatch(updatePresenca({ id, nome, curso }))
            queryClient.invalidateQueries({ queryKey: ['aluno', id] })
            queryClient.invalidateQueries({ queryKey: ['alunos'] })
            navigate(`/aluno/${id}`)
        }, onError: (error) => {
            toastError(getMensagemErro(error))
        }
    })

    function saveAluno(values: FormAluno) {
        mutate.mutate({ ...values, id })
    }

    return (
        <Container>
            <div className="editar-content">
                <h1 className="editar-titulo">Editar aluno {params.id}</h1>
                {query.isLoading ? (
                    <p className="editar-carregando">Carregando dados do aluno</p>
                ) : query.isError ? (
                    <Alert severity="error">{getMensagemErro(query.error)}</Alert>
                ) : query.data && (
                    <AlunoForm aluno={query.data} cursos={cursos} isPending={mutate.isPending} saveAluno={saveAluno} />
                )}
                <div className="editar-voltar">
                    <Botao texto="Cancelar" estilo="secundario" onClick={() => navigate(-1)} />
                </div>
            </div>
        </Container>
    )
}