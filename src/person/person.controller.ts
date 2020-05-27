import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PersonService} from './person.service';

@Controller('persons')
export class PersonController {
  constructor(private readonly personsService : PersonService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async addPerson(
    @Body('name') name: string,
    @Body('email') email: string
  ): Promise<any> {
    const generateId = await this.personsService.create(
      name,
      email
    );
    return {id: generateId._id};
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<any>{
    return this.personsService.fetchAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('findById/:id')
  async findOne(
    @Param('id') userId: string,
  ): Promise<any> {
    return this.personsService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updatePerson(
    @Body('personId') personId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('friend') friend: string,
  ): Promise<any> {
    return this.personsService.updatePerson(personId, name, email, friend);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deletePerson(
    @Param('id') personId: string,
  ): Promise<any> {
    return this.personsService.removePerson(personId);
  }
}
