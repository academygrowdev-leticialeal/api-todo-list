import { Request, Response, NextFunction } from "express";
import { ContextRunner, FieldValidationError } from "express-validator";

import { HTTPError, onError } from "../utils";

export function dataValidation(validations: ContextRunner[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let errors: FieldValidationError[] = [];

      for (const validation of validations) {
        const result = await validation.run(req);

        if (!result.isEmpty()) {
          errors = [...errors, ...(result.array() as FieldValidationError[])];
        }
      }

      if (errors.length) {
        throw new HTTPError(
          400,
          "Requisição inválida",
          errors.map((e) => ({
            type: e.type,
            field: e.path,
            location: e.location,
            description: e.msg,
          })),
        );
      }

      next();
    } catch (error) {
      onError(error, res);
    }
  };
}
