import express, { type Express, type NextFunction, type Request, type Response } from "express"
import cors from "cors"
import helmet from "helmet"
import { LATENCIA_MS, ORIGEM_PERMITIDA } from "./config/config.js"
import { latencia } from "./performance/latencia.js"
import {
    tratarErroDaAplicacao,
    tratarErroDeToken,
    tratarErroDeValidacao,
    tratarErroGenerico,
} from "./errors/tratarErros.js"
import alunosRoutes from "./routes/alunos.routes.js"
import authRoutes from "./routes/auth.routes.js"
import cursosRoutes from "./routes/cursos.routes.js"

const app: Express = express()

const corsOptions = {
    origin: ORIGEM_PERMITIDA,
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(latencia(LATENCIA_MS))

app.use("/auth", authRoutes)
app.use("/alunos", alunosRoutes)
app.use("/cursos", cursosRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ erro: "Rota não encontrada" })
})

app.use(tratarErroDaAplicacao)
app.use(tratarErroDeValidacao)
app.use(tratarErroDeToken)
app.use(tratarErroGenerico)

export default app
