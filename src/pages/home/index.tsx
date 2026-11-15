import Container from "../../templates/container"
import "./styles.css"
import { useQuery } from "@tanstack/react-query"
import { getAlunos } from "../../service/alunos"
import { useAuth } from "../../hooks/useAuth"
import { useFormulario } from "../../hooks/useFormulario"
import { useCursos } from "../../hooks/useCursos"
import Tabela from "../../components/Tabela"
import Botao from "../../components/Botao"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"

export default function Home() {
    const { usuario } = useAuth();
    const { values, handleChange, reset } = useFormulario({ busca: "", curso: "" })
    const { cursos } = useCursos()

    const query = useQuery({ queryKey: ['alunos'], queryFn: getAlunos, staleTime: 1000 * 60 * 5, retry: false, refetchOnMount: 'always' })

    const alunosFiltrados = query.data?.alunos.filter((aluno) => {
        const nomeConfere = aluno.nome.toLowerCase().includes(values.busca.toLowerCase())
        const cursoConfere = values.curso === "" || aluno.curso === values.curso

        return nomeConfere && cursoConfere
    }) ?? []

    return (
        <div>
            <Container>
                <h1>Alunos</h1>
                <h2>Olá, {usuario.nome}</h2>
                <h3>Email: {usuario.email}</h3>

                <form className="home-filtro" onSubmit={(evento) => evento.preventDefault()}>
                    <input type="text" name="busca" placeholder="Buscar aluno pelo nome" value={values.busca}
                        onChange={handleChange} />
                    <select name="curso" value={values.curso} onChange={handleChange}>
                        <option value="">Todos os cursos</option>
                        {cursos.map((curso) => <option key={curso.id} value={curso.nome}>{curso.nome}</option>)}
                    </select>
                    <Botao texto="Limpar" variant="outlined" color="inherit" onClick={reset} />
                </form>

                <div className="home-content-list">
                    {query.isFetching ? (
                        <div className="home-carregando"><CircularProgress /></div>
                    ) : query.isError ? (
                        <Alert severity="error">Erro ao carregar os alunos. Verifique se o backend está rodando.</Alert>
                    ) : alunosFiltrados.length ? (
                        <Tabela
                            colunas={["Nome", "E-mail", "Telefone", "Curso", "Cidade"]}
                            linhas={alunosFiltrados.map((aluno) => ({
                                id: aluno.id,
                                celulas: [aluno.nome, aluno.email, aluno.telefone, aluno.curso, `${aluno.cidade}/${aluno.uf}`]
                            }))}
                        />
                    ) : (
                        <p>Nenhum aluno encontrado</p>
                    )}
                </div>
                <p className="home-total">{`${alunosFiltrados.length} aluno(s) na lista`}</p>
            </Container>
        </div>
    )
}