import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  async getAllCurrency() {
    const currencies: Currency[] = await this.currencyRepository.find();
    return currencies.map((currency: Currency) => currency.toModel());
  }
}
