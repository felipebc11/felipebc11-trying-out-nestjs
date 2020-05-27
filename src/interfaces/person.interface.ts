import * as mongoose from 'mongoose';
export interface IPerson extends mongoose.Document {
  [x: string]: any;
  name: string;
  email: string;
  friend: string;
}