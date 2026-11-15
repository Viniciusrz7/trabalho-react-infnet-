import "./styles.css"
import Button from "@mui/material/Button"

interface BotaoProps {
    texto: string
    onClick?: () => void
    type?: "button" | "submit"
    color?: "primary" | "error" | "inherit"
    variant?: "contained" | "outlined" | "text"
    disabled?: boolean
}

export default function Botao({ texto, onClick, type, color, variant, disabled }: BotaoProps) {
    return (
        <Button className="botao" type={type} color={color} variant={variant ? variant : "contained"} disabled={disabled} onClick={onClick}>{texto}</Button>
    )
}