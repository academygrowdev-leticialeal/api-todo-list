import { Request, Response } from "express";

import { BcryptAdapter } from "../adapters";
import {
  AuthService,
  TaskService,
  UserService
} from "../services";
import { onError } from "../utils";

export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const service = new AuthService(
        new UserService(new TaskService()),
        new BcryptAdapter(),
      );

      const result = await service.register({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        message: "Registration completed successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const service = new AuthService(
        new UserService(new TaskService()),
        new BcryptAdapter(),
      );

      const result = await service.login({ email, password });

      res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
