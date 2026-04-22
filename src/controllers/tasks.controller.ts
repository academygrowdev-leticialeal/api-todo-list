import { Request, Response } from "express";

import { TaskService } from "../services";
import { onError } from "../utils";

export class TasksController {
  public async createTask(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const { title, description, status } = req.body;

      const service = new TaskService();

      const result = await service.createTask({
        userId,
        title,
        description,
        status
      });

      res.status(201).json({
        success: true,
        message: "Task created successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async findTask(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const service = new TaskService();

      const result = await service.findTask({ taskId: id as string, userId });

      res.status(200).json({
        success: true,
        message: "Record found successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async updateTask(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { title, description, status } = req.body;

      const service = new TaskService();

      const result = await service.updateTask({
        userId,
        taskId: id as string,
        title,
        description,
        status
      });

      res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async deleteTask(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const service = new TaskService();

      const result = await service.deleteTask({
        userId,
        taskId: id as string,
      });

      res.status(200).json({
        success: true,
        message: "Record deleted successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async listTasksByUserId(req: Request, res: Response) {
    try {
      const { ...filters } = req.query;
      const userId = req.user.id;

      const service = new TaskService();

      const result = await service.listTasksByUserId({
        ...filters,
        userId
      });

      res.status(200).json({
        success: true,
        message: "Records listed successfully.",
        data: result.map((t) => t.toJSON()),
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
