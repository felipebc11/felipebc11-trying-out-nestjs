import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule} from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:27017`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
