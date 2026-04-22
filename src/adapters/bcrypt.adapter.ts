import bcrypt from "bcrypt";

import { envs } from "../envs";

export class BcryptAdapter {
  constructor(private _salt: number = envs.BCRYPT_SALT) {}

  public generateHash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this._salt);
  }

  public compareHash(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}
