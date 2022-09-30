import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MeekolonySalesDto {
  @IsString()
  @ApiProperty()
  signature: string;

  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  source: string;

  @IsString()
  @ApiProperty()
  tokenMint: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  collection: string;

  @IsString()
  @ApiProperty()
  collectionSymbol: string;

  @IsNumber()
  @ApiProperty()
  slot: number;

  @IsNumber()
  @ApiProperty()
  blockTime: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  buyer: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  buyerReferral: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  seller: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  sellerReferral: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;
}
