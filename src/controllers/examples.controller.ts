import { Request, Response } from "express";

import { ExampleService, ExternalService } from "../services";
import { onError } from "../utils";

export class ExamplesController {
  public async createExample(req: Request, res: Response) {
    try {

      const { ...exampleData } = req.body;

      const service = new ExampleService(new ExternalService());

      const result = await service.createExample({
        ...exampleData
      });

      res.status(201).json({
        success: true,
        message: "Example created successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async findExample(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const service = new ExampleService(new ExternalService());

      const result = await service.findExample({
        exampleId: Number(id),
      });

      res.status(200).json({
        success: true,
        message: "Record found successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async updateExample(req: Request, res: Response) {
    try {

      const { id } = req.params;
      const { ...exampleData } = req.body;

      // Uncomment the following line if you want to get the logged user id from the request 
      // (e.g., if you want to check if the user is the author of the example before allowing the update)
      // const userLoggedId = req.user.id;

      const service = new ExampleService(new ExternalService());

      const result = await service.updateExample({
        exampleId: Number(id),
        ...exampleData,
      });

      res.status(200).json({
        success: true,
        message: "Record updated successfully.",
        data: result.toJSON(),
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async deleteExample(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Uncomment the following line if you want to get the logged user id from the request 
      // (e.g., if you want to check if the user is the author of the example before allowing the update)
      // const userLoggedId = req.user.id;

      const service = new ExampleService(new ExternalService());

      const result = await service.deleteExample({
        exampleId: Number(id),
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

  public async listExamples(_: Request, res: Response) {
    try {
      const service = new ExampleService(new ExternalService());

      const result = await service.listExamples();

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
