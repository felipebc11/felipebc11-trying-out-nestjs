import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {

  constructor(){
    this.config();
  }

  private config(){
    sgMail.setApiKey(process.env.APIKEY_SENDGRID);
  }

  readonly execute = async ({ to, friend }): Promise<any> => {
    const msg = {
      to,
      from: 'felipebc11@gmail.com',
      subject: 'Resultado do Amigo Secreto',
      text: `Seu amigo é: ${friend}`,
      html: `<strong>Seu amigo secreto é: ${friend}</strong>`,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log('ERROR IN EMAIL SERVICE', error);
      return error;
    }
    
  }
}
