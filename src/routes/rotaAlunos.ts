import { Router } from "express";
import { alunoController } from "../controllers/alunos_controller";

const rotaAluno = Router();
rotaAluno.post("/", alunoController.insereAlunos);
rotaAluno.get("/", alunoController.listaAlunos);
//rotaAluno.get("/:id", alunoController.getAluno);
rotaAluno.delete("/:id", alunoController.deletaAluno);
rotaAluno.put("/:id", alunoController.atualizaAluno);

export { rotaAluno };
