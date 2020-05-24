import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';

import { PersonService} from './person.service';

@Controller('persons')
export class PersonController {
  constructor(private readonly personsService : PersonService) {}

  @Post('create')
  async addPerson(
    @Body('name') name: string,
    @Body('email') email: string
  ) {
    const generateId = await this.personsService.create(
      name,
      email
    );
    return {id: generateId._id};
  }

  @Get()
  async getAll(){
    return this.personsService.fetchAll();
  }

  @Get('findById/:id')
  async findOne(
    @Param('id') userId: string,
  ){
    return this.personsService.findOne(userId);
  }

  @Patch()
  async updatePerson(
    @Body('personId') personId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('friend') friend: string,
  ){
    return this.personsService.updatePerson(personId, name, email, friend);
  }

  @Delete('delete/:id')
  async deletePerson(
    @Param('id') personId: string,
  ){
    return this.personsService.removePerson(personId);
  }
}
