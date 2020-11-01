import { Request, Response } from "express";
import {
  badRequest,
  internalServerError,
  notFound,
  validateNumber,
} from "../services/util";
import { alunoModel, Alunos } from "../models/alunos_model";
import { ok } from "assert";

const insereAlunos = (req: Request, res: Response) => {
  {
    const aluno = req.body;
    if (!aluno) return badRequest(res, "Aluno inválido");

    if (!aluno.rga) return badRequest(res, "Informe o RGA");

    if (!aluno.nome) return badRequest(res, "Informe o nome");
  }

  const insereAluno = req.body as Alunos;
  return alunoModel
    .insereAluno(insereAluno)
    .then((alunos_model) => {
      res.json({
        alunos_model,
      });
    })
    .catch((err) => internalServerError(res, err));
};

const listaAlunos = (req: Request, res: Response) => {
  alunoModel
    .listaAlunos()
    .then((alunos_model) => {
      res.json(alunos_model);
    })
    .catch((err) => internalServerError(res, err));
};

/*const getAluno = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) {
      return badRequest(res, "id inválido");
    }
  }
  return alunoModel
    .getAluno(id)
    .then((alunos_model) => {
      if (alunos_model) return res.json(alunos_model);
      else return notFound(res);
    })
    .catch((err) => internalServerError(res, err));
};*/

const deletaAluno = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) {
      return badRequest(res, "id inválido");
    }
    const alunoExistente = await alunoModel.getAluno(id);
    if (!alunoExistente) return notFound(res);
  }
  return alunoModel
    .deletaAluno(id)
    .then(() => {
      res.json(ok(res, "deletado com sucesso"));
    })
    .catch((err) => internalServerError(res, err));
};

const atualizaAluno = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) {
      return badRequest(res, "id inválido");
    }
    const aluno = req.body;
    if (!aluno) return badRequest(res, "Aluno inválido");

    if (!aluno.rga) return badRequest(res, "Informe o RGA");

    if (!aluno.nome) return badRequest(res, "Informe o nome");

    const alunoExistente = await alunoModel.getAluno(id);
    if (!alunoExistente) return notFound(res);
  }

  const atualizaAluno = req.body as Alunos;
  return alunoModel
    .atualizaAluno(atualizaAluno, id)
    .then((alunos_model) => {
      res.json({
        alunos_model,
      });
    })
    .catch((err) => internalServerError(res, err));
};

export const alunoController = {
  insereAlunos,
  listaAlunos,
  //getAluno,
  deletaAluno,
  atualizaAluno,
};
