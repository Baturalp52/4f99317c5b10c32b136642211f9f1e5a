import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DEFAULT_EXCHANGE_RATES } from 'src/constants/default-exchange-rates.constant';
import { TcmbDateFormat } from 'src/helpers/tcmb-date-format.helper';

@Injectable()
export class TcmbExchangeRatesService {
  constructor(private readonly httpService: HttpService) {}
  async getDefaultExchangeRates(requestedDate: string) {
    const series = DEFAULT_EXCHANGE_RATES.map(
      (exchangeRate) => `TP.DK.${exchangeRate}.A`,
    );
    let date: string;
    if (requestedDate) {
      date = requestedDate;
    } else {
      date = TcmbDateFormat(new Date(Date.now()));
    }

    const { data } = await this.httpService.axiosRef.get(
      `/service/evds/series=${series.join('-')}&key=${
        process.env.TCMB_API_KEY
      }&type=json&startDate=${date}&endDate=${date}`,
    );
    const exchangeRateObject = data?.items[0];
    return DEFAULT_EXCHANGE_RATES.reduce((obj, rateKey) => {
      obj[rateKey] = parseFloat(exchangeRateObject[`TP_DK_${rateKey}_A`]);
      return obj;
    }, {});
  }
}
