import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TcmbExchangeRatesModule } from './api-services/tcmb-exchange-rates/tcmb-exchange-rates.module';
import { ExchangeRatesDataApiExchangeRatesModule } from './api-services/exchange-rates-data-api-exchange-rates/exchange-rates-data-api-exchange-rates.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TcmbExchangeRatesModule,
    ExchangeRatesDataApiExchangeRatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
