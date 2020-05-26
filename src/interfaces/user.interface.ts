import * as mongoose from 'mongoose';
export interface IUser extends mongoose.Document {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly passwordhash: string;
}