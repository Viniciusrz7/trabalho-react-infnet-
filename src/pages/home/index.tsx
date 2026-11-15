import Container from "../../templates/container"
import "./styles.css"
import { useQuery } from "@tanstack/react-query"
import { getAlunos, postAluno } from "../../service/alunos"
import { useAuth } from "../../hooks/useAuth"
import { useFormulario } from "../../hooks/useFormulario"
import { useCursos } from "../../hooks/useCursos"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store"
import { addPresenca, removePresenca } from "../../store/presencaSlice"
import { FiEdit, FiEye, FiUserCheck, FiUserPlus } from "react-icons/fi"
import Tabela from "../../components/Tabela"
import Botao from "../../components/Botao"
import BotaoAcao from "../../components/BotaoAcao"
import Modal from "../../components/Modal"
import Clima from "../../components/Clima"
import AlunoForm from "../../components/AlunoForm"
import type { FormAluno } from "../../components/AlunoForm"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import { useMutation } from "@tanstack/react-query"
import { toastError, toastSuccess } from "../../utils/toast"
import { getMensagemErro } from "../../utils/erros"

export default function Home() {
    const { usuario } = useAuth();
    const { values, handleChange, reset } = useFormulario({ busca: "", curso: "" })
    const { cursos } = useCursos()
    const [isVisibleModalForm, setIsVisibleModalForm] = useState(false)
    const navigate = useNavigate()
    const presencas = useSelector((state: RootState) => state.presenca.items)
    const dispatch = useDispatch()

    const query = useQuery({ queryKey: ['alunos'], queryFn: getAlunos, staleTime: 1000 * 60 * 5, retry: false, refetchOnMount: 'always' })

    const mutate = useMutation({
        mutationFn: postAluno, onSuccess: () => {
            toastSuccess("Aluno cadastrado com sucesso")
            setIsVisibleModalForm(false)
            query.refetch()
        }, onError: (error) => {
            toastError(getMensagemErro(error))
        }
    })

    function saveAluno(values: FormAluno) {
        mutate.mutate(values)
    }

    const alunos = query.data ? query.data.alunos : []
    const alunosFiltrados = alunos.filter((aluno) => aluno.nome.toLowerCase().includes(values.busca.toLowerCase()) && (values.curso === "" || aluno.curso === values.curso))

    return (
        <div>
            <Container>
                <div className="home-topo">
                    <div>
                        <h1>Alunos</h1>
                        <h2>Olá, {usuario.nome}</h2>
                        <h3>Email: {usuario.email}</h3>
                    </div>
                    <Clima />
                </div>

                <div className="home-filtro">
                    <input type="text" placeholder="Buscar aluno pelo nome" value={values.busca}
                        onChange={(evento) => handleChange("busca", evento.target.value)} />
                    <select value={values.curso} onChange={(evento) => handleChange("curso", evento.target.value)}>
                        <option value="">Todos os cursos</option>
                        {cursos.map((curso) => <option key={curso.id} value={curso.nome}>{curso.nome}</option>)}
                    </select>
                    <Botao texto="Limpar" variant="outlined" color="inherit" onClick={reset} />
                </div>

                <div className="home-content-list">
                    {query.isFetching ? (
                        <div className="home-carregando"><CircularProgress /></div>
                    ) : query.isError ? (
                        <Alert severity="error">Erro ao carregar os alunos. Verifique se o backend está rodando.</Alert>
                    ) : alunosFiltrados.length ? (
                        <Tabela
                            colunas={["Nome", "E-mail", "Telefone", "Curso", "Cidade", "Ações"]}
                            linhas={alunosFiltrados.map((aluno) => ({
                                id: aluno.id,
                                celulas: [aluno.nome, aluno.email, aluno.telefone, aluno.curso, `${aluno.cidade}/${aluno.uf}`,
                                <div className="home-acoes">
                                    {presencas.find((item) => item.id === aluno.id) ? (
                                        <BotaoAcao titulo="Remover presença" color="success" onClick={() => dispatch(removePresenca(aluno.id))}><FiUserCheck /></BotaoAcao>
                                    ) : (
                                        <BotaoAcao titulo="Marcar presença" onClick={() => dispatch(addPresenca({ id: aluno.id, nome: aluno.nome, curso: aluno.curso }))}><FiUserPlus /></BotaoAcao>
                                    )}
                                    <BotaoAcao titulo="Ver detalhes" onClick={() => navigate(`/aluno/${aluno.id}`)}><FiEye /></BotaoAcao>
                                    <BotaoAcao titulo="Editar aluno" onClick={() => navigate(`/aluno/${aluno.id}/editar`)}><FiEdit /></BotaoAcao>
                                </div>]
                            }))}
                        />
                    ) : (
                        <p>Nenhum aluno encontrado</p>
                    )}
                </div>
                <p className="home-total">{alunosFiltrados.length} aluno(s) na lista</p>
                <button onClick={() => setIsVisibleModalForm(true)} className="home-botao-novo" title="Cadastrar aluno">+</button>
                <Modal closeModal={() => setIsVisibleModalForm(false)} modalIsOpen={isVisibleModalForm}>
                    <h3 className="modal-titulo">Novo aluno</h3>
                    <AlunoForm cursos={cursos} isPending={mutate.isPending} saveAluno={saveAluno} />
                </Modal>
            </Container>
        </div>
    )
}