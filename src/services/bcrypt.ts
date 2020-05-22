import * as bcrypt from 'bcryptjs';

export default class Auth {
  public static hashPassword(password: string) {
    const hashedpass = bcrypt.hash(password, 10);
    return hashedpass;
  }
}