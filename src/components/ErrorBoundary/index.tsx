import "./styles.css"
import { Component } from "react"

interface ErrorBoundaryProps {
    children: React.ReactNode
}

interface ErrorBoundaryState {
    temErro: boolean
    mensagem: string
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { temErro: false, mensagem: "" }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { temErro: true, mensagem: error.message }
    }

    componentDidCatch(error: Error) {
        console.error("Erro capturado pelo ErrorBoundary:", error)
    }

    recarregar() {
        window.location.reload()
    }

    render() {
        if (this.state.temErro) {
            return (
                <div className="erro-content">
                    <div className="erro-card">
                        <h1>Algo deu errado</h1>
                        <p>Aconteceu um erro inesperado e a tela não pôde ser exibida.</p>
                        <p className="erro-detalhe">{this.state.mensagem}</p>
                        <button onClick={this.recarregar}>Recarregar a página</button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}