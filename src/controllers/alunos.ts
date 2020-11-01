import { Request, Response } from "express";
import {
  accessDenied,
  badRequest,
  internalServerError,
  notFound,
  okPost,
  validateNumber,
} from "../services/util";
import { alunoModel, Alunos } from "../models/aluno";
import { ok } from "assert";

//Método respinsável por inserção de novos alunos
const insereAlunos = (req: Request, res: Response) => {
  {
    const aluno = req.body;
    //Valida os valores recebidos
    if (!aluno) return badRequest(res, "Aluno inválido");

    if (!aluno.rga) return badRequest(res, "Informe o RGA");

    if (!aluno.nome) return badRequest(res, "Informe o nome");
  }

  const insereAluno = req.body as Alunos;
  return alunoModel
    .insereAluno(insereAluno)
    .then((alunos) => {
      okPost(res);
      res.json({
        alunos,
      });
    })
    .catch((err) => internalServerError(res, err));
};

//Lista todos os alunos do banco de dados
const listaAlunos = (_req: Request, res: Response) => {
  alunoModel
    .listaAlunos()
    .then((alunos) => {
      res.json(alunos);
    })
    .catch((err) => internalServerError(res, err));
};

//Retorna um aluno específico
const getAluno = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) {
      return notFound(res, "Id inválido");
    }
  }
  return alunoModel
    .getAluno(id)
    .then((aluno) => {
      if (aluno) {
        ok(res);
        return res.json(aluno);
      } else {
        return notFound(res, "Usuário não existe!");
      }
    })
    .catch((err) => internalServerError(res, err));
};

//Deleta um aluno
const deletaAluno = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) {
      return notFound(res, "id inválido");
    }
    const alunoExistente = await alunoModel.getAluno(id);
    if (!alunoExistente) return notFound(res, "Usuário não existe!");
  }
  return alunoModel
    .deletaAluno(id)
    .then(() => {
      res.json(ok(res, "deletado com sucesso"));
    })
    .catch((err) => internalServerError(res, err));
};

//Atualiza os dados de um determinado aluno
const atualizaAluno = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) {
      return notFound(res, "id inválido");
    }
    const aluno = req.body;
    if (!aluno) return badRequest(res, "Aluno inválido");

    if (!aluno.rga) return badRequest(res, "Informe o RGA");

    if (!aluno.nome) return badRequest(res, "Informe o nome");

    const alunoExistente = await alunoModel.getAluno(id);
    if (!alunoExistente) return notFound(res, "Usuário não existe!");
  }

  const atualizaAluno = req.body as Alunos;
  //retorna o aluno com promisse
  return alunoModel
    .atualizaAluno(atualizaAluno, id)
    .then((aluno) => {
      res.json({
        aluno,
      });
    })
    .catch((err) => internalServerError(res, err));
};

//Faz a tentativa de deletar todos os alunos
const deleteAll = (_req: Request, res: Response) => {
  return accessDenied(res, "Acesso Negado!");
};

//Faz a tentativa de atualizar todos os alunos
const atualizaAll = (_req: Request, res: Response) => {
  return accessDenied(res, "Acesso Negado!");
};

//Faz a tentativa de inserir um aluno com id de possível escolha
const insereUmAlunos = (_req: Request, res: Response) => {
  return accessDenied(res, "Acesso Negado!");
};

export const alunoController = {
  insereAlunos,
  listaAlunos,
  getAluno,
  deletaAluno,
  atualizaAluno,
  deleteAll,
  atualizaAll,
  insereUmAlunos,
};
