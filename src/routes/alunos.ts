import { Router } from "express";
import { alunoController } from "../controllers/alunos";

const rotaAluno = Router();

//Retorna todos os alunos
rotaAluno.get("/", alunoController.listaAlunos);

//Insere um aluno
rotaAluno.post("/", alunoController.insereAlunos);

//Retorna um aluno
rotaAluno.get("/:id", alunoController.getAluno);

//Modifica um aluno
rotaAluno.put("/:id", alunoController.atualizaAluno);

//Deleta um aluno
rotaAluno.delete("/:id", alunoController.deletaAluno);

//Modifica todos os alunos
rotaAluno.put("/", alunoController.atualizaAll);

//Deleta todos os alunos
rotaAluno.delete("/", alunoController.deleteAll);

//Insere um aluno especifico
rotaAluno.post("/:id", alunoController.insereUmAlunos);

export { rotaAluno };
