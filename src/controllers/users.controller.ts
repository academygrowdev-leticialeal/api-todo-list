import { Request, Response } from "express";

import {
  TaskService,
  UserService,
} from "../services";
import { onError } from "../utils";

export class UsersController {
  public async listAll(_: Request, res: Response) {
    try {
      const service = new UserService(
        new TaskService()
      );

      const result = await service.listAll();

      res.status(200).json({
        success: true,
        message: "Records listed successfully.",
        data: result.map((u) => u.toJSON()),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const service = new UserService(
        new TaskService()
      );

      const result = await service.getById(id as string);

      res.status(200).json({
        success: true,
        message: "Record found successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
