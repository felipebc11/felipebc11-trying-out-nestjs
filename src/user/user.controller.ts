import { Controller, Post, Body } from '@nestjs/common';

import { UserService} from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async addUser(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const generatedId = await this.usersService.create(
      email,
      username,
      password
    );
    return { id: generatedId._id};
  }
}
