import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DrawController } from './draw.controller';
import { DrawService } from './draw.service';
import { EmailService } from '../services/email/email.service';
import { PersonModule } from '../person/person.module';
import { PersonSchema } from '../person/person.model';

@Module({
  imports: [
    PersonModule,
    MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema}]),
  ],
  controllers: [DrawController],
  providers: [DrawService, EmailService],
  exports: [DrawService, EmailService],
})
export class DrawModule {}
