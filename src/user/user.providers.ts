import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { DATABASE_CONNECTION } from './constants';
import { USER_MODEL } from './constants';

export const userProviders = 
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION],
  };