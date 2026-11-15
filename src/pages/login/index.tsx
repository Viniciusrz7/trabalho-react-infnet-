import './styles.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useMutation } from "@tanstack/react-query"
import {useAuth} from "../../hooks/useAuth";
import { useFormulario } from "../../hooks/useFormulario";

export interface ResponseAuth {
    "token": string;
    "usuario": { id: number, nome: string, email: string }
}

export default function Login() {

    const { values, handleChange } = useFormulario({ email: '', password: '' });
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const {setAuthData} = useAuth()

    async function authLogin() {

        const response = await axios.post<ResponseAuth>('http://localhost:3001/auth/login', { email: values.email, password: values.password }, {
            validateStatus: function (status) {
                return status < 500
            }
        })

        if (response.status !== 200) {
            setErro('Usuário ou senha incorretos')
            return;
        }

        setAuthData(response.data)
        navigate("/home")
    }

    const mutate = useMutation({
        mutationFn: authLogin, onError: () => {
            setErro('Não foi possível conectar ao servidor')
        }
    })

    function onSubmit() {
        if (values.email === '' || values.password === '') {
            setErro('Preencha todos os campos');
            return;
        }
        else {
            setErro('')
            mutate.mutate();
        }
    }

    return (
        <div className="container-login">
            <form className="container-form-login">
                <h1>Login</h1>
                <p>Informe seus dados corretamente</p>

                <input type="text" placeholder="Email" value={values.email}
                    onChange={(evento) => handleChange("email", evento.target.value)} />
                <input type="password" placeholder="Senha" value={values.password}
                    onChange={(evento) => handleChange("password", evento.target.value)} />

                {erro && <span className="login-erro">{erro}</span>}

                <button type="button" disabled={mutate.isPending} onClick={onSubmit}>{mutate.isPending ? 'Entrando...' : 'Entrar'}</button>
            </form>
        </div>
    )
}