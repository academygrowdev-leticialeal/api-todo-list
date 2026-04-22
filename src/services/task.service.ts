import { Prisma, Task as TaskEntity, } from "@prisma/client";

import prismaRepository from "../database/prisma.repository";
import {
  CreateTaskDto,
  UpdateTaskDto,
  FilterTasks,
  FindTaskDto,
  ListTasksByUserDto,

} from "../dtos";
import { Task, User } from "../models";
import { HTTPError } from "../utils";

export class TaskService {
  constructor() { }

  public async createTask(dto: CreateTaskDto): Promise<Task> {
    const newTask = await prismaRepository.task.create({
      data: { ...dto },
      include: { user: true },
    });

    return this.mapToModel(newTask);
  }

  public async findTask(dto: FindTaskDto): Promise<Task> {
    const taskDB = await prismaRepository.task.findUnique({
      where: { id: dto.taskId },
      include: { user: true },
    });

    if (!taskDB) throw new HTTPError(404, "Task not found");

    if (taskDB.userId !== dto.userId) throw new HTTPError(403, "You are not allowed to access this task");

    const user = new User(
      taskDB.user.id,
      taskDB.user.name,
      taskDB.user.email,
      undefined,
      taskDB.user.createdAt,
      taskDB.user.updatedAt,
    );

    const task = this.mapToModel(taskDB);
    task.withUser(user);

    return task;
  }

  public async updateTask(dto: UpdateTaskDto): Promise<Task> {
    await this.findTask(dto);

    const taskUpdated = await prismaRepository.task.update({
      where: { id: dto.taskId },
      data: { title: dto.title, description: dto.description, status: dto.status },
    });

    return this.mapToModel(taskUpdated);
  }

  public async deleteTask(dto: FindTaskDto): Promise<Task> {
    await this.findTask(dto);

    const taskDeleted = await prismaRepository.task.delete({
      where: { id: dto.taskId },
    });

    return this.mapToModel(taskDeleted);
  }

  public async listTasksByUserId(dto: ListTasksByUserDto): Promise<Task[]> {

    const where: Prisma.TaskWhereInput = {
      userId: dto.userId,
      title: dto.title && {
        contains: dto.title,
        mode: "insensitive"
      },
      description: dto.description && {
        contains: dto.description,
        mode: "insensitive"
      },
      status: dto.status && {
        equals: dto.status
      }
    }


    const tasksDB = await prismaRepository.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });


    return tasksDB.map((task) => this.mapToModel(task));
  }

  private mapToModel(entity: TaskEntity): Task {
    return new Task(
      entity.id,
      entity.title,
      entity.description,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
