import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getStatusDto } from './get-status.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAppStatus(): getStatusDto {
    return this.appService.getStatus();
  }
}
