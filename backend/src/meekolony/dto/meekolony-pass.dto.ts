import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class MeekolonyPassDto {
  @IsString()
  @ApiProperty()
  symbol: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  twitter: string;

  @IsString()
  @ApiProperty()
  discord: string;

  @IsString()
  @ApiProperty()
  website: string;

  @IsArray()
  @ApiProperty()
  categories: string[];

  @IsNumber()
  @ApiProperty()
  floorPrice: number;

  @IsNumber()
  @ApiProperty()
  listedCount: number;

  @IsNumber()
  @ApiProperty()
  avgPrice24hr: number;

  @IsNumber()
  @ApiProperty()
  volumeAll: number;
}
