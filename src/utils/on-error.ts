import { Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

import { HTTPError } from "./http.error";

export function onError(error: unknown, res: Response): Response {
  if (error instanceof HTTPError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details,
    });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      mensagem: "Token inválido ou expirado",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    details: [
      {
        type: "system",
        field: "unknown",
        description: (error as Error).toString(),
        location: (error as Error).name,
      },
    ],
  });
}
