import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor (
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  readonly create = async (email: string, username: string, password: string): Promise<IUser> =>{
    try {
      const newUser = await this.userModel.create({
        email,
        username,
        password
      });
      return newUser;
    } catch (error) {
      console.log('ERROR', error)
      throw new HttpException(`Can't register the user`, HttpStatus.NOT_FOUND)
    }
  }

  readonly findOne = async (username: string): Promise<IUser> =>{
    let user;
    try {
      user = await this.userModel.findOne({username: username}).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if(!user){
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}