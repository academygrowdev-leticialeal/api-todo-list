import { TaskDto } from "../models";


export type CreateTaskDto = Omit<TaskDto, "id" | "createdAt" | "updatedAt" | "user"> & { userId: string };

export interface FindTaskDto {
  taskId: string;
  userId: string;
}

export type UpdateTaskDto = Partial<CreateTaskDto> & FindTaskDto;

export type FilterTasks = Partial<CreateTaskDto>;

export type ListTasksByUserDto = FilterTasks & { userId: string };


