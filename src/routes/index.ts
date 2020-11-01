import { Application } from "express";
import Router from "express";
import { rotaAluno } from "./rotaAlunos";

export const useRoutes = (app: Application) => {
  const apiRouter = Router();
  apiRouter.use("/alunos_model", rotaAluno);

  app.use("/api/v1", apiRouter);
};
