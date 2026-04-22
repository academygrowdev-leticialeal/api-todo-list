export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export type LoginUserDto = Omit<CreateUserDto, 'name'>;

export interface AuthUserDto {
    id: string;
    name: string;
    email: string;
}

export interface LoginOutputDto {
    authToken: string;
    authUser: AuthUserDto;
}