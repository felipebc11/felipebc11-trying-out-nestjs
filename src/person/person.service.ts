import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPerson } from '../interfaces/person.interface';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel('Person')
    private readonly personModel: Model<IPerson>,
  ){}

  async create(name: string, email: string){
    try {
      const newUser = await this.personModel.create({
        name,
        email
      });
      return newUser;
    } catch (error) {
      console.log('ERROR', error)
      throw new HttpException(`Can't register the user`, HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: string): Promise<IPerson>{
    let user;
    try {
      user = await this.personModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find person.');
    }
    if(!user){
      throw new NotFoundException('Could not find person.');
    }
    const {_id, name, email} = user;
    user = {
      id: _id,
      name,
      email
    }
    return user;
  }

  async fetchAll(): Promise<IPerson>{
    let people;
    try {
      people = await this.personModel.find().select();
    } catch (error) {
      throw new NotFoundException('Could not find people.');
    }
    return people;
  }

  async updatePerson(
    personId: string,
    name: string,
    email: string,
    friend: string,
  ) {

    try {
      const updatedPerson = await this.personModel.findById(personId);
      if(name){
        updatedPerson.name = name;
      }
  
      if(email){
        updatedPerson.email = email;
      }

      if(friend){
        updatedPerson.friend = friend;
      }
  
      updatedPerson.save();
      return {message: 'Sucess.'};
    } catch (error) {
      throw new HttpException('No records found.', HttpStatus.NOT_FOUND);
    }
    
  }

  async removePerson(id: string){
    const result =await this.personModel.deleteOne({_id: id});
    if(result.deletedCount>0) return {message: 'Sucess.'};
    throw new HttpException('No records found by this id.', HttpStatus.NOT_FOUND);
  }
}
