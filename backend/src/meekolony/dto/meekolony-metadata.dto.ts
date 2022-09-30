import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class MeekolonyMetadataDto {
  @IsString()
  @ApiProperty()
  model: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  mintAddress: string;

  @IsObject()
  @IsOptional()
  @ApiProperty()
  json: object;

  @IsBoolean()
  @ApiProperty()
  jsonLoaded: boolean;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  symbol: string;

  @IsString()
  @ApiProperty()
  uri: string;

  @IsBoolean()
  @ApiProperty()
  isMutable: boolean;

  @IsBoolean()
  @ApiProperty()
  primarySaleHappened: boolean;

  @IsNumber()
  @ApiProperty()
  sellerFeeBasisPoints: number;

  @IsNumber()
  @ApiProperty()
  editionNonce: number;

  @IsArray()
  @ApiProperty()
  creators: object[];

  @IsObject()
  @IsOptional()
  @ApiProperty()
  uses: object;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  seller_fee_basis_points: number;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  external_url: string;

  @IsArray()
  @ApiProperty()
  properties: object[];

  @IsArray()
  @ApiProperty()
  attributes: object[];
}
