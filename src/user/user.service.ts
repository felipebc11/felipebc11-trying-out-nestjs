import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from './user.model';

@Injectable()
export class UserService {
  constructor (
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async create(email: string, username: string, password: string){
    try {
      const newUser = await this.userModel.create({
        email,
        username,
        password
      });
      return newUser;
    } catch (error) {
      console.log('ERROR', error)
      throw new HttpException(`Can't register`, HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: string): Promise<IUser>{
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if(!user){
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
