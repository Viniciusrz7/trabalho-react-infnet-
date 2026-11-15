import "./styles.css"
import Button from "@mui/material/Button"

interface BotaoProps {
    texto: string
    onClick?: () => void
    type?: "button" | "submit"
    estilo?: "perigo" | "secundario"
    disabled?: boolean
}

export default function Botao({ texto, onClick, type, estilo, disabled }: BotaoProps) {
    return (
        <Button className={estilo ? `botao botao-${estilo}` : "botao"} type={type} variant={estilo === "secundario" ? "outlined" : "contained"} disabled={disabled} onClick={onClick}>{texto}</Button>
    )
}