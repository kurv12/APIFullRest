import { Response } from "express";

//Acesso não aceito
export const badRequest = (res: Response, err: string) =>
  res.status(400).json({
    err,
  });

//Não funciona
export const notFound = (res: Response, err: String) =>
  res.status(404).json({
    err,
  });

//Funciona bem
export const ok = (res: Response) => res.sendStatus(200);

//Funciona bem ao inserir
export const okPost = (res: Response) => res.sendStatus(201);

//Erro no servidor
export const internalServerError = (res: Response, err: Error) =>
  res.status(500).json({
    err: err.message,
  });

//Acesso negado
export const accessDenied = (res: Response, err: string) =>
  res.status(405).json({
    err,
  });

//Valida um número
export const validateNumber = (num: any) => parseFloat(num) > 0;
