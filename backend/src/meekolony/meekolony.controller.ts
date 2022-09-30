import { Controller, Get, Query, Param } from '@nestjs/common';
import { MeekolonyService } from './meekolony.service';
import { MeekolonyCollectionDto } from './dto/meekolony-collection.dto';
import { MeekolonyMetadataDto } from './dto/meekolony-metadata.dto';
import { MeekolonyPassDto } from './dto/meekolony-pass.dto';
import { QueriesDto } from './dto/queries.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { MeekolonySalesDto } from './dto/meekolony-sales.dto';

@Controller('meekolony')
export class MeekolonyController {
  constructor(private readonly meekolonyService: MeekolonyService) {}

  @Get()
  @ApiOkResponse({ type: MeekolonyPassDto })
  getMeekolonyInfo(): Promise<MeekolonyPassDto> {
    return this.meekolonyService.getMeekoInfo();
  }

  @Get('/collections')
  @ApiOkResponse({ type: MeekolonyCollectionDto, isArray: true })
  getAllMeeko(@Query() queries: QueriesDto): Promise<MeekolonyCollectionDto[]> {
    return this.meekolonyService.getMeekoCollections(queries);
  }

  @Get('/owners/:address')
  @ApiOkResponse({ type: MeekolonyMetadataDto, isArray: true })
  getMeekolonyByOwnerAddress(
    @Param('address') address: string,
  ): Promise<MeekolonyMetadataDto[]> {
    return this.meekolonyService.getMeekoByOwner(address);
  }

  @Get('/sales')
  @ApiOkResponse({ type: MeekolonySalesDto, isArray: true })
  getMeekoSales(@Query() queries: QueriesDto): Promise<MeekolonySalesDto[]> {
    return this.meekolonyService.getMeekoCollectionSales(queries);
  }

  @Get('/uniqueHolders')
  getUniqueHolders() {
    return this.meekolonyService.getUniqueHolders();
  }

  @Get('/:tokenMint')
  @ApiOkResponse({ type: MeekolonyCollectionDto })
  getMeekolonyDetails(
    @Param('tokenMint') tokenMint: string,
  ): Promise<MeekolonyCollectionDto> {
    return this.meekolonyService.getMeekoDetails(tokenMint);
  }

  @Get('/:tokenMint/sales')
  @ApiOkResponse({ type: MeekolonySalesDto, isArray: true })
  getSingleMeekoSales(
    @Param('tokenMint') tokenMint: string,
    @Query() queries: QueriesDto,
  ): Promise<MeekolonySalesDto[]> {
    return this.meekolonyService.getSingleMeekoSales(tokenMint, queries);
  }
}
