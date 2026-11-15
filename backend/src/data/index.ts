import type { Aluno, Curso, Usuario } from "../utils/types.js"
import alunosJson from "./alunos.json" with { type: "json" }
import cursosJson from "./cursos.json" with { type: "json" }
import usuariosJson from "./usuarios.json" with { type: "json" }

export const alunos: Aluno[] = alunosJson
export const cursos: Curso[] = cursosJson
export const usuarios: Usuario[] = usuariosJson
