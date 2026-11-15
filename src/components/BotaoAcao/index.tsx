import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

interface BotaoAcaoProps {
    titulo: string
    onClick: () => void
    children: React.ReactNode
    color?: "default" | "primary" | "error" | "success"
}

export default function BotaoAcao({ titulo, onClick, children, color = "default" }: BotaoAcaoProps) {
    return (
        <Tooltip title={titulo}>
            <IconButton aria-label={titulo} size="small" color={color} onClick={onClick}>
                {children}
            </IconButton>
        </Tooltip>
    )
}