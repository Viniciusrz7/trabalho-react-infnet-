import "./styles.css"
import { useNavigate } from "react-router"
import { useAuth } from "../../hooks/useAuth"

export default function NotFound() {

    const { token } = useAuth()
    const navigate = useNavigate()

    function onNavigate() {
        navigate(token ? "/home" : "/", { replace: true })
    }

    return (
        <div className="not-found-content">
            <div className="not-found-card">
                <h1>404</h1>
                <p>Página não encontrada</p>
                <button onClick={onNavigate}>{token ? "Voltar para os alunos" : "Ir para o login"}</button>
            </div>
        </div>
    )
}