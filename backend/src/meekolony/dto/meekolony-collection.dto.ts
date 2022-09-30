import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class MeekolonyCollectionDto {
  @IsString()
  @ApiProperty()
  mintAddress: string;

  @IsString()
  @ApiProperty()
  owner: string;

  @IsNumber()
  @ApiProperty()
  supply: number;

  @IsString()
  @ApiProperty()
  collection: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  updateAuthority: string;

  @IsBoolean()
  @ApiProperty()
  primarySaleHappened: boolean;

  @IsNumber()
  @ApiProperty()
  sellerFeeBasisPoints: number;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  externalUrl: string;

  @IsArray()
  @ApiProperty()
  attributes: object[];

  @IsArray()
  @ApiProperty()
  properties: object[];

  @IsNumber()
  @ApiProperty()
  price: number;
}
