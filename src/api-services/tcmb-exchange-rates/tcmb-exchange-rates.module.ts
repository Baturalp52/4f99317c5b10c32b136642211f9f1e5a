import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TcmbExchangeRatesService } from './tcmb-exchange-rates.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://evds2.tcmb.gov.tr/',
    }),
  ],
  providers: [TcmbExchangeRatesService],
  exports: [TcmbExchangeRatesService],
})
export class TcmbExchangeRatesModule {}
