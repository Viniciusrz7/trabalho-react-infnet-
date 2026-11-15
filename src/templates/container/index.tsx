import {useNavigate} from "react-router"
import './styles.css'
import { useContext } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { ThemeContextInstance } from '../../contexts/themeContextInstance';
import { FiMoon, FiSun } from "react-icons/fi";
interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {

    const { theme, toggleTheme } = useContext(ThemeContextInstance)
    const { clearUser } = useAuth();
    const navigate = useNavigate();

    function logout() {
        clearUser();
        navigate("/",{replace:true});
    }

    return (
        <div className={`container-content ${theme === "dark" ? "tema-escuro" : ""}`}>
            <header className="container-header">
                <h1>Escola-vini</h1>
                <nav >
                    <ul className="list-item">
                        <li onClick={() => { navigate("/home") }}>Alunos</li>
                        <li onClick={toggleTheme}>{theme === "dark" ? <FiSun /> : <FiMoon />} Tema {theme === "dark" ? "claro" : "escuro"}</li>
                        <li onClick={logout}>Sair</li>
                    </ul>
                </nav>
            </header>

            <div className="container-children">
                {children}
            </div>
            <footer className="container-footer">
                <p>Todos os direitos reservados</p>
            </footer>
        </div>
    )
}