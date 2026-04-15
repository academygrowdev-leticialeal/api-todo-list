import { Example as ExampleEntity } from "@prisma/client";

import { ExternalService } from ".";
import prismaRepository from "../database/prisma.repository";
import { CreateExampleDto, FindExampleDto, UpdateExampleDto } from "../dtos";
import { Example } from "../models";
import { HTTPError } from "../utils";
import { JsonObject } from "@prisma/client/runtime/library";

export class ExampleService {

  // Example of constructor with dependency injection
  constructor(
    private externalService: ExternalService,
    // You can inject other services or repositories as needed
  ) { }


  public async createExample(dto: CreateExampleDto): Promise<Example> {
    const newExample = await prismaRepository.example.create({
      data: { ...dto },
    });

    return this.mapToModel(newExample);
  }

  public async findExample(dto: FindExampleDto): Promise<Example> {
    const exampleDB = await prismaRepository.example.findUnique({
      where: { id: dto.exampleId },
    });

    if (!exampleDB) {
      throw new HTTPError(404, "Example not found");
    }

    return this.mapToModel(exampleDB);
  }

  public async updateExample(dto: UpdateExampleDto): Promise<Example> {
    const exampleFound = await this.findExample(dto);

    // Uncomment the following lines if you want to check if the user is the author of the example before allowing the update
    /*
      if (exampleFound.toJSON()?.author?.id !== dto.authorId) {
        throw new HTTPError(403, "You are not allowed to update this example");
      }
    */

    const exampleUpdated = await prismaRepository.example.update({
      where: { id: dto.exampleId },
      data: { ...dto },
    });

    return this.mapToModel(exampleUpdated);
  }

  public async deleteExample(dto: FindExampleDto): Promise<Example> {
    const exampleFound = await this.findExample(dto);

    // Uncomment the following lines if you want to check if the user is the author of the example before allowing the delete
    /*
      if (exampleFound.toJSON()?.author?.id !== dto.authorId) {
        throw new HTTPError(403, "You are not allowed to update this example");
      }
    */

    const exampleDeleted = await prismaRepository.example.delete({
      where: { id: dto.exampleId },
    });

    return this.mapToModel(exampleDeleted);
  }

  public async listExamples(): Promise<Example[]> {
    const examplesDB = await prismaRepository.example.findMany({
      orderBy: { createdAt: "desc" }
    });

    return examplesDB.map((example) => this.mapToModel(example));
  }

  // Example of a method that interacts with an external service
  public async logExampleAction(message: string): Promise<void> {
    await this.externalService.doLog(message);
  }


  // Example of a private method to map the database entity to the model
  // Add here any additional mapping logic if needed (e.g., formatting dates, transforming fields, etc.)
  private mapToModel(entity: ExampleEntity): Example {
    return new Example(
      entity.id,
      entity.fieldString,
      entity.fieldNumber,
      entity.fieldBoolean,
      entity.fieldDate,
      entity.fieldArray,
      entity.fieldObject as JsonObject as { nestedField: string },
      entity.fieldOptional ?? undefined,
      entity.createdAt,
      entity.updatedAt,
    );
  }

}
