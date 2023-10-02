import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailByForm(email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'test email nodemailer',
      template: 'email',
      context: {
        name,
      },
    });
  }
}
