import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateEmailDto } from './dto/create-email.dto/create-email.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async SendEmail(@Body() createEmailDto: CreateEmailDto) {
    return await this.mailService.sendEmailByForm(createEmailDto);
  }
}
