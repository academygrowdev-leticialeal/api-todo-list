export interface ExampleDto {
  id: number;
  fieldString: string;
  fieldNumber: number;
  fieldBoolean: boolean;
  fieldDate: Date;
  fieldArray: string[];
  fieldObject: {
    nestedField: string;
  };
  fieldOptional?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Example {
  constructor(
    private id: number,
    private fieldString: string,
    private fieldNumber: number,
    private fieldBoolean: boolean,
    private fieldDate: Date,
    private fieldArray: string[],
    private fieldObject: { nestedField: string },
    private fieldOptional?: string,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
    private relation?: any
  ) { }

  public withRelation(relation: any) {
    this.relation = relation;
    return this;
  }

  public toJSON(): ExampleDto {
    return {
      id: this.id,
      fieldString: this.fieldString,
      fieldNumber: this.fieldNumber,
      fieldBoolean: this.fieldBoolean,
      fieldDate: this.fieldDate,
      fieldArray: this.fieldArray,
      fieldObject: this.fieldObject,
      fieldOptional: this.fieldOptional,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
