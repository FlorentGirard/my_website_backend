import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async SendEmail(@Body() body: any) {
    return await this.mailService.sendEmailByForm(body.email, body.name);
  }
}
