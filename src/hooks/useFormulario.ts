import { useState } from "react"

export function useFormulario<T>(valoresIniciais: T) {

    const [values, setValues] = useState<T>(valoresIniciais)

    function handleChange(evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = evento.target
        setValues({ ...values, [name]: value })
    }

    function reset() {
        setValues(valoresIniciais)
    }

    return { values, handleChange, reset }
}
