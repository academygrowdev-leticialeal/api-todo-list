import express from "express";
import { body, param, query } from "express-validator";

import { TasksController } from "../controllers";
import { authMiddleware, dataValidation } from "../middlewares";
import { HTTPError } from "../utils";

export class TasksRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new TasksController();

    router.post(
      "/tasks",
      authMiddleware,
      dataValidation([
        body("title").isString().isLength({ min: 1 }),
        body("description").isString().isLength({ min: 1 }),
        body("status").custom((data) => {
          if (!["pendente", "em_andamento", "concluida"].includes(data)) throw new HTTPError(400, "Status invalid")

          return true
        }),
      ]),
      controller.createTask,
    );

    router.get(
      "/tasks/:id",
      authMiddleware,
      dataValidation([param("id").isUUID()]),
      controller.findTask,
    );

    router.put(
      "/tasks/:id",
      authMiddleware,
      dataValidation([
        param("id").isUUID(),
        body("title").optional().isString().isLength({ min: 1 }),
        body("description").optional().isString().isLength({ min: 1 }),
        body("status").optional().custom((data) => {
          if (!["pendente", "em_andamento", "concluida"].includes(data)) throw new HTTPError(400, "Status invalid")

          return true
        }),
      ]),
      controller.updateTask,
    );

    router.delete(
      "/tasks/:id",
      authMiddleware,
      dataValidation([param("id").isUUID()]),
      controller.deleteTask,
    );

    router.get(
      "/tasks",
      authMiddleware,
      dataValidation([
        query("title").optional().isString().isLength({ min: 1 }),
        query("description").optional().isString().isLength({ min: 1 }),
        query("status").optional().custom((data) => {
          if (!["pendente", "em_andamento", "concluida"].includes(data)) throw new HTTPError(400, "Status invalid")

          return true
        }),
      ]),
      controller.listTasksByUserId,
    );

    return router;
  }
}
