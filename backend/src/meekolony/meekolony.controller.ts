import { Controller, Get, Query, Param } from '@nestjs/common';
import { MeekolonyService } from './meekolony.service';
import { QueriesDto } from './dto/queries.dto';

@Controller('meekolony')
export class MeekolonyController {
  constructor(private readonly meekolonyService: MeekolonyService) {}

  @Get()
  getMeekolonyInfo() {
    return this.meekolonyService.getMeekoInfo();
  }

  @Get('/collections')
  getAllMeeko(@Query() queries: QueriesDto) {
    return this.meekolonyService.getMeekoCollections(queries);
  }

  @Get('/collections/:tokenMint')
  getMeekoByOwnerAddress(@Param('tokenMint') tokenMint: string) {
    return this.meekolonyService.getMeekoByOwner(tokenMint);
  }

  @Get('/owners/:address')
  getMeekolonyByOwnerAddress(@Param('address') address: string) {
    return this.meekolonyService.getMeekoByOwner(address);
  }

  @Get('/sales')
  getMeekoSales(@Query() queries: QueriesDto) {
    return this.meekolonyService.getMeekoCollectionSales(queries);
  }

  @Get('/uniqueHolders')
  getUniqueHolders() {
    return this.meekolonyService.getUniqueHolders();
  }

  @Get('/:tokenMint')
  getMeekolonyDetails(@Param('tokenMint') tokenMint: string) {
    return this.meekolonyService.getMeekoDetails(tokenMint);
  }

  @Get('/:tokenMint/sales')
  getSingleMeekoSales(
    @Param('tokenMint') tokenMint: string,
    @Query() queries: QueriesDto,
  ) {
    return this.meekolonyService.getSingleMeekoSales(tokenMint, queries);
  }
}
