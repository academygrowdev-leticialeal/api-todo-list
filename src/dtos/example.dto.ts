import { ExampleDto } from "../models";

export type CreateExampleDto = Omit<ExampleDto, "id" | "createdAt" | "updatedAt">;

export interface FindExampleDto {
  exampleId: number;
}

export type UpdateExampleDto = CreateExampleDto & FindExampleDto;

