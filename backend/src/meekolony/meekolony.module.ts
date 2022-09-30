import { Module } from '@nestjs/common';
import { MeekolonyService } from './meekolony.service';
import { MeekolonyController } from './meekolony.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from 'nestjs-http-promise';

@Module({
  imports: [
    ConfigModule,
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
})
export class MeekolonyModule {}
