import jwt from "jsonwebtoken";
import { StringValue } from "ms";

import { envs } from "../envs";

export class JWTAdapter {
  constructor(
    private _secret: string = envs.JWT_SECRET_KEY,
    private _expireIn: StringValue = envs.JWT_EXPIRE_IN as StringValue,
  ) {}

  public generateToken(data: string | Buffer | object): string {
    return jwt.sign(data, this._secret, {
      expiresIn: this._expireIn,
    });
  }

  public decodeToken<T>(token: string): T {
    return jwt.verify(token, this._secret) as T;
  }
}
