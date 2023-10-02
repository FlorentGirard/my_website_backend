import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto/create-email.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailByForm(CreateEmailDto: CreateEmailDto) {
    const { email, name, message, phone } = CreateEmailDto;

    await this.mailerService
      .sendMail({
        to: process.env.MAIL_PRO,
        subject: 'Demande de projet ',
        template: 'email',
        context: {
          name,
          email,
          message,
          phone,
        },
      })
      .then((success) => {
        if (success) {
          const emailPro = process.env.MAIL_PRO;
          this.mailerService.sendMail({
            to: email,
            subject: 'Accusé reception de votre demande',
            template: 'acknowledgementsOfReceipt',
            context: {
              name,
              emailPro,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
