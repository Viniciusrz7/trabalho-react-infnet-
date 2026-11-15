import Presencas from '../../components/Presencas';
import Modal from '../../components/Modal';
import {useNavigate} from "react-router"
import './styles.css'
import { useContext, useState } from 'react';
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { ThemeContextInstance } from '../../contexts/themeContextInstance';
import type { RootState } from "../../store";
import { FiMoon, FiSun } from "react-icons/fi";
interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {

    const [visibleModal, setVisibleModal] = useState(false)
    const totalPresencas = useSelector((state: RootState) => state.presenca.items.length)
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
                        <li onClick={() => { setVisibleModal(true) }}>Presenças ({totalPresencas})</li>
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

            <Modal modalIsOpen={visibleModal} closeModal={() => { setVisibleModal(false) }}>
                <h3 className="modal-titulo">Lista de presença</h3>
                <Presencas />
            </Modal>
        </div>
    )
}