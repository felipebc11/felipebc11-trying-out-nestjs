import * as mongoose from 'mongoose';
import Auth from '../services/bcrypt';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordhash: {
    type: String
  }
});

UserSchema.pre<IUser>('save', async function(next) {
  if(!this.isModified('password')){
    return next();
  }
  const hashedPassword = await Auth.hashPassword(this.password);
  if(hashedPassword!= undefined) this.passwordhash = hashedPassword;
});



export interface IUser extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  passwordhash: string;
}