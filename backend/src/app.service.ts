import { Injectable } from '@nestjs/common';
import { StatusDto } from './status.dto';

@Injectable()
export class AppService {
  getStatus(): StatusDto {
    return { status: 'ok' };
  }
}
