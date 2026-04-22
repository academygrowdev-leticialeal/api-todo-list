import { AuthUserDto, CreateUserDto, LoginOutputDto, LoginUserDto } from "../dtos";
import { User } from "../models";
import { HTTPError } from "../utils";
import { UserService } from "./user.service";
import { BcryptAdapter, JWTAdapter } from "../adapters";


export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptAdapter: BcryptAdapter,
  ) { }

  public async register(dto: CreateUserDto): Promise<User> {
    const usernameAlreadyExists = await this.userService.findByEmail(dto.email);

    if (usernameAlreadyExists) throw new HTTPError(409, "E-mail already exists");

    const passwordHashed = await this.bcryptAdapter.generateHash(dto.password);

    const newUser = await this.userService.create({
      ...dto,
      password: passwordHashed,
    });

    return newUser;
  }

  public async login(dto: LoginUserDto): Promise<LoginOutputDto> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new HTTPError(404, "Invalid credentials");

    const isPasswordMatch = await this.bcryptAdapter.compareHash(
      dto.password,
      user.password ?? "",
    );

    if (!isPasswordMatch) throw new HTTPError(401, "Invalid credentials");

    const authUser: AuthUserDto = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const jwt = new JWTAdapter();
    const token = jwt.generateToken(authUser);

    return {
      authToken: token,
      authUser,
    };
  }
}
