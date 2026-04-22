import { NextFunction, Request, Response } from "express";

import { JWTAdapter } from "../adapters";
import { AuthUserDto } from "../dtos";
import { onError, HTTPError } from "../utils";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      throw new HTTPError(401, "Token de autenticação não informado.");
    }

    const [, token] = auth.split(" ");

    const jwt = new JWTAdapter();

    const data = jwt.decodeToken<AuthUserDto>(token);

    if (!data) {
      throw new HTTPError(401, "Token inválido.");
    }

    req.user = data;

    next();
  } catch (error) {
    onError(error, res);
  }
}
