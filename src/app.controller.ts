import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetExchangeRatesQueryRequestDto } from './dto/get-exchange-rates.request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-rates')
  getExchangeRates(@Query() query: GetExchangeRatesQueryRequestDto) {
    try {
      return this.appService.getExchangeRates(query);
    } catch (e) {
      return e;
    }
  }
}
