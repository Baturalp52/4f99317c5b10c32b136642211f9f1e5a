import { Injectable } from '@nestjs/common';
import { ExchangeRatesDataApiExchangeRatesService } from './api-services/exchange-rates-data-api-exchange-rates/exchange-rates-data-api-exchange-rates.service';
import { TcmbExchangeRatesService } from './api-services/tcmb-exchange-rates/tcmb-exchange-rates.service';
import { DEFAULT_EXCHANGE_RATES } from './constants/default-exchange-rates.constant';
import { GetExchangeRatesQueryRequestDto } from './dto/get-exchange-rates.request.dto';

@Injectable()
export class AppService {
  exchangeRateServices: Array<any>;
  constructor(
    private readonly tcmbExchangeService: TcmbExchangeRatesService,
    private readonly exchangeRatesDataApiService: ExchangeRatesDataApiExchangeRatesService,
  ) {
    this.exchangeRateServices = [
      this.tcmbExchangeService,
      this.exchangeRatesDataApiService,
    ];
  }
  async getExchangeRates(query: GetExchangeRatesQueryRequestDto) {
    const allRates = await Promise.all(
      this.exchangeRateServices.map((service) =>
        service.getDefaultExchangeRates(query.date),
      ),
    );
    const response = {} as any;
    DEFAULT_EXCHANGE_RATES.map((key) => {
      const exchangeRateValues = allRates?.map((rate) => rate[key]) as number[];
      response[key] = Math.min(...exchangeRateValues);
    });

    return response;
  }
}
