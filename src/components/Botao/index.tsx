import Button from "@mui/material/Button"

interface BotaoProps {
    texto: string
    onClick?: () => void
    type?: "button" | "submit"
    color?: "primary" | "error" | "inherit"
    variant?: "contained" | "outlined" | "text"
    disabled?: boolean
}

export default function Botao({ texto, onClick, type = "button", color = "primary", variant = "contained", disabled = false }: BotaoProps) {
    return (
        <Button type={type} color={color} variant={variant} disabled={disabled} onClick={onClick}>{texto}</Button>
    )
}