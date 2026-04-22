import { User as UserEntity } from "@prisma/client";

import prismaRepository from "../database/prisma.repository";
import { CreateUserDto } from "../dtos/user.dto";
import { User } from "../models";
import { HTTPError } from "../utils";
import { TaskService } from ".";

export class UserService {
    constructor(private taskService: TaskService) { }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await prismaRepository.user.findUnique({
            where: { email },
        });

        if (!user) return null;

        return this.mapToModel(user).withPassword(user.password);
    }

    public async create(dto: CreateUserDto): Promise<User> {
        const newUser = await prismaRepository.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: dto.password,
            },
        });

        return this.mapToModel(newUser);
    }

    public async getById(userId: string): Promise<User> {
        const userDB = await prismaRepository.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!userDB) throw new HTTPError(404, "User not found");

        const user = this.mapToModel(userDB);

        const tasksOfUser = await this.taskService.listTasksByUserId({ userId });
        user.withTasks(tasksOfUser);

        return user;
    }

    public async listAll(): Promise<User[]> {
        const users = await prismaRepository.user.findMany();

        return users.map((user) => this.mapToModel(user));
    }

    private mapToModel(entity: UserEntity): User {
        return new User(
            entity.id,
            entity.name,
            entity.email,
            undefined,
            entity.createdAt,
            entity.updatedAt,
        );
    }
}
