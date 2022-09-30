import { Injectable } from '@nestjs/common';
import { getStatusDto } from './get-status.dto';

@Injectable()
export class AppService {
  getStatus(): getStatusDto {
    return { status: 'ok' };
  }
}
