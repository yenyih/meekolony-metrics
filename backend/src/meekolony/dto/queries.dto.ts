import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueriesDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ required: false, default: 0, type: [Number], format: 'form' })
  offset: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ required: false, default: 20, type: [Number], format: 'form' })
  limit: number;
}
