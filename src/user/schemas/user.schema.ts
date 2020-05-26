import * as mongoose from 'mongoose';
import AuthService from '../../services/bcrypt';
import { IUser } from '../../interfaces/user.interface';
export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
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
  const hashedPassword = await AuthService.hashPassword(this.password);
  if(hashedPassword!= undefined) this.passwordhash = hashedPassword;
});
