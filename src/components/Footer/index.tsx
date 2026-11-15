import "./styles.css"
import { Component } from "react"

interface FooterProps {
    texto: string
}

export default class Footer extends Component<FooterProps> {
    render() {
        return (
            <footer className="footer">
                <p>{this.props.texto}</p>
            </footer>
        )
    }
}