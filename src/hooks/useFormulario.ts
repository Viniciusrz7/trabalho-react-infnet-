import { useState } from "react"

interface FormularioProps {
    [campo: string]: string
}

export function useFormulario(valoresIniciais: FormularioProps) {

    const [values, setValues] = useState(valoresIniciais)

    function handleChange(campo: string, valor: string) {
        setValues({ ...values, [campo]: valor })
    }

    function reset() {
        setValues(valoresIniciais)
    }

    return { values, handleChange, reset }
}
