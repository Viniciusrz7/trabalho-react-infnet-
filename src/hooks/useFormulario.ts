import { useState } from "react"

export function useFormulario(valoresIniciais: Record<string, string>) {

    const [values, setValues] = useState(valoresIniciais)

    function handleChange(campo: string, valor: string) {
        setValues({ ...values, [campo]: valor })
    }

    function reset() {
        setValues(valoresIniciais)
    }

    return { values, handleChange, reset }
}
