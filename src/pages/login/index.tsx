import './styles.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import {useAuth} from "../../hooks/useAuth";
import { useFormulario } from "../../hooks/useFormulario";

export interface ResponseAuth {
    "token": string;
    "usuario": { id: number, nome: string, email: string }
}

export default function Login() {

    const { values, handleChange } = useFormulario({ email: '', password: '' });
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const {setAuthData} = useAuth()

    async function authLogin() {
        setCarregando(true)

        try {
            const response = await axios.post<ResponseAuth>('http://localhost:3001/auth/login', values, {
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
        } catch {
            setErro('Não foi possível conectar ao servidor')
        } finally {
            setCarregando(false)
        }
    }

    function onSubmit(evento: React.SubmitEvent<HTMLFormElement>) {
        evento.preventDefault()

        if (values.email === '' || values.password === '') {
            setErro('Preencha todos os campos');
            return;
        }
        else {
            setErro('')
            authLogin();
        }
    }

    return (
        <div className="container-login">
            <form className="container-form-login" onSubmit={onSubmit}>
                <h1>Login</h1>
                <p>Informe seus dados corretamente</p>

                <input type="text" name="email" placeholder="Email" value={values.email}
                    onChange={handleChange} />
                <input type="password" name="password" placeholder="Senha" value={values.password}
                    onChange={handleChange} />

                {erro && <span className="login-erro">{erro}</span>}

                <button type="submit" disabled={carregando}>{carregando ? 'Entrando...' : 'Entrar'}</button>
            </form>
        </div>
    )
}