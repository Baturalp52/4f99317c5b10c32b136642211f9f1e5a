import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExchangeRatesDataApiExchangeRatesService } from './exchange-rates-data-api-exchange-rates.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'https://api.apilayer.com/',
        headers: {
          apikey: configService.get('EXCHANGE_RATES_DATA_API_KEY'),
        },
      }),
    }),
  ],
  providers: [ExchangeRatesDataApiExchangeRatesService],
  exports: [ExchangeRatesDataApiExchangeRatesService],
})
export class ExchangeRatesDataApiExchangeRatesModule {}
