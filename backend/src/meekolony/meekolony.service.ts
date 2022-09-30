import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import { MeekolonyPassDto } from './dto/meekolony-pass.dto';
import { QueriesDto } from './dto/queries.dto';
import { MeekolonyCollectionDto } from './dto/meekolony-collection.dto';
import { MeekolonyMetadataDto } from './dto/meekolony-metadata.dto';
import { MeekolonySalesDto } from './dto/meekolony-sales.dto';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

@Injectable()
export class MeekolonyService {
  private readonly connection: Connection;
  private readonly metaplex: Metaplex;

  constructor(private readonly httpService: HttpService) {
    this.connection = new Connection(clusterApiUrl('mainnet-beta'));
    this.metaplex = new Metaplex(this.connection);
  }

  async getMeekoByOwner(ownerAddress: string): Promise<MeekolonyMetadataDto[]> {
    try {
      const nfts = await this.metaplex
        .nfts()
        .findAllByOwner({ owner: new PublicKey(ownerAddress) })
        .run();

      const result = [];

      for (const nft of nfts) {
        if (!nft.symbol.includes('MKLN')) continue;

        const { data } = await this.httpService.get(nft.uri);
        result.push({ ...nft, ...data });
      }

      return result;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getMeekoInfo(): Promise<MeekolonyPassDto> {
    try {
      const { data } = await this.httpService.get(`/collections/meekolony`);
      return data;
    } catch (error) {
      const message = error.response ? error.response.data : error;
      const status = error.response ? error.response.status : 400;
      throw new HttpException(message, status);
    }
  }

  async getMeekoCollections(
    queriesDto: QueriesDto,
  ): Promise<MeekolonyCollectionDto[]> {
    try {
      const { data } = await this.httpService.get(
        `/collections/meekolony/listings`,
        {
          params: queriesDto,
        },
      );

      if (data.length === 0) return data;

      await delay(1500); // Temporary: due to Magic Eden rate limit.

      const tokenMints = data.map((item) =>
        this.httpService.get(`/tokens/${item.tokenMint}`),
      );
      const result = await Promise.all(tokenMints);
      return result.map((response, index) => ({
        ...response.data,
        price: data[index].price,
      }));
    } catch (error) {
      const message = error.response ? error.response.data : error;
      const status = error.response ? error.response.status : 400;
      throw new HttpException(message, status);
    }
  }

  async getMeekoDetails(tokenMint: string): Promise<MeekolonyCollectionDto> {
    try {
      const { data } = await this.httpService.get(`/tokens/${tokenMint}`);
      return data;
    } catch (error) {
      const message = error.response ? error.response.data : error;
      const status = error.response ? error.response.status : 400;
      throw new HttpException(message, status);
    }
  }

  async getMeekoCollectionSales(
    queriesDto: QueriesDto,
  ): Promise<MeekolonySalesDto[]> {
    try {
      let result = [];
      const { data } = await this.httpService.get(
        `/collections/meekolony/activities`,
        {
          params: queriesDto,
        },
      );
      result = data.filter((activity) => activity.type === 'buyNow');
      const mintAddresses = result.map((each) => new PublicKey(each.tokenMint));
      const allMetadata = await this.metaplex
        .nfts()
        .findAllByMintList({ mints: mintAddresses })
        .run();

      for (let i = 0; i < result.length; i++) {
        result[i].name = allMetadata[i].name;
      }

      return result;
    } catch (error) {
      const message = error.response ? error.response.data : error;
      const status = error.response ? error.response.status : 400;
      throw new HttpException(message, status);
    }
  }

  async getSingleMeekoSales(
    tokenMint: string,
    queriesDto: QueriesDto,
  ): Promise<MeekolonySalesDto[]> {
    try {
      const { data } = await this.httpService.get(
        `/tokens/${tokenMint}/activities`,
        {
          params: queriesDto,
        },
      );
      return data;
    } catch (error) {
      const message = error.response ? error.response.data : error;
      const status = error.response ? error.response.status : 400;
      throw new HttpException(message, status);
    }
  }

  async getUniqueHolders() {
    try {
      // WIP ...
      return {};
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
