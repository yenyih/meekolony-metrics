import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StatusDto {
  @IsString()
  @ApiProperty()
  status: string;
}
