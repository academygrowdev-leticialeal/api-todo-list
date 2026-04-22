import express from "express";
import { body } from "express-validator";

import { AuthController } from "../controllers";
import { dataValidation } from "../middlewares";

export class AuthRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new AuthController();

    router.post(
      "/auth/login",
      dataValidation([
        body("username").isLength({ min: 1 }),
        body("password").isLength({ min: 1 }),
      ]),
      controller.login,
    );

    router.post(
      "/auth/register",
      dataValidation([
        body("name").isLength({ min: 3 }),
        body("username").isLength({ min: 3 }),
        body("password").isLength({ min: 5 }),
        body("imageUrl").optional().isURL(),
      ]),
      controller.register,
    );

    return router;
  }
}
