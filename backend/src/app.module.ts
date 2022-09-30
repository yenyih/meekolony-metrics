import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MeekolonyModule } from './meekolony/meekolony.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MeekolonyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
