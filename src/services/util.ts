import { Response } from "express";

//Retorna o erro 400
export const badRequest = (res: Response, err: string) =>
  res.status(400).json({
    err,
  });

export const notFound = (res: Response, err: String) =>
  res.status(404).json({
    err,
  });

export const ok = (res: Response) => res.sendStatus(200);

export const okPost = (res: Response) => res.sendStatus(201);

//Erro no servidor
export const internalServerError = (res: Response, err: Error) =>
  res.status(500).json({
    err: err.message,
  });

export const validateNumber = (num: any) => parseFloat(num) > 0;

export const accessDenied = (res: Response, err: string) =>
  res.status(405).json({
    err,
  });
