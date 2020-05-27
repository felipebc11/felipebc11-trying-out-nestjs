import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IPerson } from '../interfaces/person.interface';

export class Utils {

constructor(
  @InjectModel('Person')
  private readonly personModel: Model<IPerson>
){}

  randOrd = () => {
    return (Math.round(Math.random())-0.5);
  }

  async capturePersons() {
    const persons = await this.personModel.find();

    const personsMapped = persons.map(person => person.name);
    return personsMapped.sort(this.randOrd);
  }

  sorted = async (): Promise<any> => {
    const nameMarticipants = await this.capturePersons();
  
    nameMarticipants.map(async (name: string, index: number) => {
      //verify if the actual index is equal to lenght of array of participants name.
      if (index === nameMarticipants.length -1) {
        const where = { name };
        const query = { friend: nameMarticipants[0] };
        await this.personModel.updateOne(where, query);
      } else {
        const where = { name };
        const query = { friend: nameMarticipants[index + 1] };
        await this.personModel.updateOne(where, query);
      }
    })
  }
}