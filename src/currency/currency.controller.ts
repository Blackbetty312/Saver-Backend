import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

/**
 * Controller responsible for CRUD operations on currency.
 */
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  /**
   * This endpoint retrieves all the currencies.
   */
  @Get('all')
  getCurrencyList() {
    return this.currencyService.getAllCurrency();
  }
}
