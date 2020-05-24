import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonSchema } from './person.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Person', schema: PersonSchema}]),
  ],
  controllers: [PersonController],
  providers: [PersonService]
})
export class PersonModule {}
