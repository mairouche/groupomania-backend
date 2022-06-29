import { NextFunction, Request, Response } from "express";
import { GenericError } from "../errors/http.errors";

export function handleErrors(
  err: GenericError,
  _: Request,
  res: Response,
  next: NextFunction
) {
  const { status = 500, message } = err;
  return res.status(status).send(message);
}
