import Container from "../../templates/container"
import { useNavigate, useParams } from "react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import "./styles.css"
import { FiEdit, FiTrash } from "react-icons/fi"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { removePresenca } from "../../store/presencaSlice"
import Modal from "../../components/Modal"
import Botao from "../../components/Botao"
import BotaoAcao from "../../components/BotaoAcao"
import Alert from "@mui/material/Alert"
import { getAlunoDetalhe, removeAluno } from "../../service/alunos"
import { toastError, toastSuccess } from "../../utils/toast"
import { getMensagemErro } from "../../utils/erros"

export default function Detalhes() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const id = Number(params.id)

    function openModal() {
        setModalIsOpen(true)
    }
    function closeModal() {
        setModalIsOpen(false)
    }

    const deleteMutation = useMutation({
        mutationFn: removeAluno,
        onSuccess: () => {
            toastSuccess("Aluno excluído com sucesso")
            closeModal()
            dispatch(removePresenca(id))
            queryClient.invalidateQueries({ queryKey: ['alunos'] })
            navigate("/home")
        }, onError: (error) => {
            toastError(getMensagemErro(error))
        },
        retryDelay: 3000,
    })

    const query = useQuery({ queryKey: ['aluno', id], queryFn: () => getAlunoDetalhe(id), staleTime: 1000 * 60 * 5, retry: false })

    return (
        <Container>
            <div className="detalhes-content">
                {query.data && (
                    <div className="detalhes-acoes">
                        <BotaoAcao titulo="Editar aluno" onClick={() => navigate(`/aluno/${id}/editar`)}><FiEdit /></BotaoAcao>
                        <BotaoAcao titulo="Excluir aluno" color="error" onClick={openModal}><FiTrash /></BotaoAcao>
                    </div>
                )}
                <h1 className="detalhes-titulo">Detalhes do aluno {params.id}</h1>
                {query.isFetching ? <p className="detalhes-carregando">Carregando detalhes do aluno</p> : query.isError ? (
                    <Alert severity="error">{getMensagemErro(query.error)}</Alert>
                ) : (
                    <div className="detalhes-aluno">
                        <h2 className="detalhes-nome">{query.data?.nome}</h2>
                        <p className="detalhes-curso">{query.data?.curso}</p>
                        <p><strong>E-mail:</strong> {query.data?.email}</p>
                        <p><strong>Telefone:</strong> {query.data?.telefone}</p>
                        <p><strong>Endereço:</strong> {`${query.data?.logradouro} - ${query.data?.bairro}`}</p>
                        <p><strong>Cidade:</strong> {`${query.data?.cidade}/${query.data?.uf}`}</p>
                        <p><strong>CEP:</strong> {query.data?.cep}</p>
                    </div>
                )}
                <div className="detalhes-voltar">
                    <Botao texto="Voltar" variant="outlined" color="inherit" onClick={() => navigate("/home")} />
                </div>
            </div>
            <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
                <h3 className="modal-titulo">{`Tem certeza que deseja excluir o aluno ${query.data?.nome}?`}</h3>
                <div className="modal-botoes">
                    {deleteMutation.isPending ? (<p>Apagando...</p>) : (<Botao texto="Sim" color="error" onClick={() => { deleteMutation.mutate(id) }} />)}
                    <Botao texto="Não" variant="outlined" color="inherit" onClick={closeModal} />
                </div>
            </Modal>
        </Container>
    )
}