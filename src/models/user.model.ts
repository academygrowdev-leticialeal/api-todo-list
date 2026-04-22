import { Task, TaskDto } from ".";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  tasks?: TaskDto[];
}

export class User {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _password?: string,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
    private _tasks?: Task[]
  ) { }


  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string | undefined {
    return this._password;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get tasks(): Task[] | undefined {
    return this._tasks;
  }


  public withPassword(password: string) {
    this._password = password;
    return this;
  }

  public withTasks(tasks: Task[]) {
    this._tasks = tasks;
    return this;
  }

  public toJSON(): UserDto {
    return {
      id: this.id,
      name: this._name,
      email: this._email,
      password: this._password,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      tasks: this._tasks?.map((task) => task.toJSON())
    };
  }
}
