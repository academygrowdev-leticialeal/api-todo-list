import express from "express";
import { param } from "express-validator";

import { UsersController } from "../controllers";
import { authMiddleware, dataValidation } from "../middlewares";

export class UsersRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new UsersController();

    router.get("/users", controller.listAll);

    router.get(
      "/users/:id",
      authMiddleware,
      dataValidation([param("id").isUUID()]),
      controller.getById,
    );

    return router;
  }
}
