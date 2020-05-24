import * as mongoose from 'mongoose';
export interface IPerson extends mongoose.Document {
  name: string;
  email: string;
  friend: string;
}