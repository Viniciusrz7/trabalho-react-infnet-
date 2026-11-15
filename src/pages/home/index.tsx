import Container from "../../templates/container"
import { useAuth } from "../../hooks/useAuth"

export default function Home() {
    const { usuario } = useAuth();

    return (
        <div>
            <Container>
                <h1>Alunos</h1>
                <h2>Olá, {usuario.nome}</h2>
                <h3>Email: {usuario.email}</h3>
            </Container>
        </div>
    )
}