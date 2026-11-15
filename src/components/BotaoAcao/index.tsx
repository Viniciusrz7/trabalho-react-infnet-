import "./styles.css"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

interface BotaoAcaoProps {
    titulo: string
    onClick: () => void
    children: React.ReactNode
    estilo?: "perigo" | "sucesso"
}

export default function BotaoAcao({ titulo, onClick, children, estilo }: BotaoAcaoProps) {
    return (
        <Tooltip title={titulo}>
            <IconButton className={estilo ? `botao-acao botao-acao-${estilo}` : "botao-acao"} aria-label={titulo} onClick={onClick}>
                {children}
            </IconButton>
        </Tooltip>
    )
}