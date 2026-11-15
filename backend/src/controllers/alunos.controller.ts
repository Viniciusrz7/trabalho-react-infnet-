import type { Request, Response } from "express"
import { AlunoBody } from "../schemas/alunos.schema.js"
import * as alunosService from "../services/alunos.service.js"
import type { Aluno } from "../utils/types.js"

export function listar(req: Request, res: Response<{ alunos: Aluno[] }>) {
    res.json({ alunos: alunosService.listar() })
}

export function buscar(req: Request, res: Response<Aluno, { id: number }>) {
    res.json(alunosService.buscar(res.locals.id))
}

export function criar(req: Request, res: Response<Aluno>) {
    const dados = AlunoBody.parse(req.body)
    res.status(201).json(alunosService.criar(dados))
}

export function atualizar(req: Request, res: Response<Aluno, { id: number }>) {
    const dados = AlunoBody.parse(req.body)
    res.json(alunosService.atualizar(res.locals.id, dados))
}

export function excluir(req: Request, res: Response<{ mensagem: string }, { id: number }>) {
    alunosService.excluir(res.locals.id)
    res.json({ mensagem: "Aluno excluído" })
}
