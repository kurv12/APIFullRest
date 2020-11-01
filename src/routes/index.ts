import { Application } from "express";
import Router from "express";
import { rotaAluno } from "./alunos";

//Insere a rota
export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  //Informa que deve-se usar a rotaAlunos
  apiRouter.use("/alunos", rotaAluno);

  app.use("/api/v1", apiRouter);
};
