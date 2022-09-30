import { Test, TestingModule } from '@nestjs/testing';
import { MeekolonyController } from './meekolony.controller';
import { MeekolonyService } from './meekolony.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

describe('CollectionsController', () => {
  let controller: MeekolonyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            baseURL: configService.get('AXIOS_BASE_URL'),
            timeout: configService.get('AXIOS_TIMEOUT'),
            maxRedirects: configService.get('AXIOS_MAX_REDIRECTS'),
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [MeekolonyController],
      providers: [MeekolonyService],
    }).compile();

    controller = module.get<MeekolonyController>(MeekolonyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
