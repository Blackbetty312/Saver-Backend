import { Currency } from './currency.entity';

export class CurrencyModel {
  id: number;
  name: string;
  code: string;
  symbol: string;

  constructor(currency: Currency) {
    this.id = currency.id;
    this.name = currency.name;
    this.code = currency.code;
    this.symbol = currency.symbol;
  }
}
