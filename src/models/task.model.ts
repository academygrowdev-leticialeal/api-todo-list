import { User, UserDto } from ".";

type StatusTask = "pendente" | "em_andamento" | "concluida";

export interface TaskDto {
  id: string;
  title: string;
  description: string;
  status: StatusTask;
  createdAt: Date;
  updatedAt: Date;
  user?: UserDto;
}

export class Task {
  constructor(
    private _id: string,
    private _title: string,
    private _description: string,
    private _status: StatusTask,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
    private _user?: User
  ) { }


  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get status(): StatusTask {
    return this._status;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }


  public withUser(user: User) {
    this._user = user;
    return this;
  }

  public toJSON(): TaskDto {
    return {
      id: this.id,
      title: this._title,
      description: this._description,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      user: this._user?.toJSON()
    };
  }
}
