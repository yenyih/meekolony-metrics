import { Test, TestingModule } from '@nestjs/testing';
import { MeekolonyService } from './meekolony.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

describe('MeekolonyService', () => {
  let service: MeekolonyService;

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
      providers: [MeekolonyService],
    }).compile();

    service = module.get<MeekolonyService>(MeekolonyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
