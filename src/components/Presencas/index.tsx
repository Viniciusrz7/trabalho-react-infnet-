import './styles.css'
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../store"
import { removePresenca, clearPresencas } from "../../store/presencaSlice"
import { FiUserX } from "react-icons/fi"
import Tabela from "../Tabela"
import Botao from "../Botao"
import BotaoAcao from "../BotaoAcao"

export default function Presencas() {

    const items = useSelector((state: RootState) => state.presenca.items)
    const dispatch = useDispatch()

    return (
        <div className="presencas">
            {items.length === 0 ? (
                <p className='presencas-vazia'>Nenhuma presença registrada</p>
            ) : (
                <>
                    <Tabela
                        colunas={["Aluno", "Curso", "Ações"]}
                        linhas={items.map((item) => ({
                            id: item.id,
                            celulas: [item.nome, item.curso,
                            <BotaoAcao titulo="Remover presença" estilo="perigo" onClick={() => dispatch(removePresenca(item.id))}><FiUserX /></BotaoAcao>]
                        }))}
                    />
                    <p className='presencas-total'>{items.length} presença(s) registrada(s)</p>
                    <Botao texto="Limpar lista" estilo="perigo" onClick={() => dispatch(clearPresencas())} />
                </>
            )}
        </div>
    )
}