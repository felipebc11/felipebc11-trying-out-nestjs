import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Utils } from './utils';
import { IPerson } from '../interfaces/person.interface';
import { EmailService } from '../services/email/email.service';

@Injectable()
export class DrawService {
  constructor (
    @InjectModel('Person')
    private readonly personModel: Model<IPerson>,
  ) {}

  readonly draw = async (): Promise<any> => {
    const utils = new Utils(this.personModel);
    await utils.sorted();
    
    const persons = await this.personModel.find();
    const emailService = new EmailService();
    persons.map((person => {
      const paramsEmailService = {
        to: person.email,
        friend: person.friend
      }
      try {
        emailService.execute(paramsEmailService);
      } catch (error) {
        console.log('ERROR IN EMAIL SERVICE', error);
        return new HttpException('It was not possible to carry out the draw.', HttpStatus.INTERNAL_SERVER_ERROR)
      }        
      
    }));
  
    return 'Draw successful.';
  }

}
