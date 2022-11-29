import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DEFAULT_EXCHANGE_RATES } from 'src/constants/default-exchange-rates.constant';
import { ExchangeRatesDataDateFormat } from 'src/helpers/exchange-rates-data-date-format.helper';

@Injectable()
export class ExchangeRatesDataApiExchangeRatesService {
  constructor(private readonly httpService: HttpService) {}
  async getDefaultExchangeRates(requestedDate: string) {
    let date: string;
    if (requestedDate) {
      date = ExchangeRatesDataDateFormat(requestedDate);
    } else {
      date = ExchangeRatesDataDateFormat(new Date(Date.now()));
    }

    const { data } = await this.httpService.axiosRef.get(
      `exchangerates_data/${date}?symbols=${DEFAULT_EXCHANGE_RATES.join(
        ',',
      )}&base=TRY`,
    );

    return DEFAULT_EXCHANGE_RATES.reduce((obj, rateKey) => {
      obj[rateKey] = 1 / data.rates[rateKey];
      return obj;
    }, {});
  }
}
