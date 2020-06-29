import { Account } from './account.entity';
import { TransformMoney } from '../utilities/utils';
import { UserModel } from '../user/user.model';
import { CurrencyModel } from '../currency/currency.model';

export class AccountModel {
  id: number;
  name: string;
  color: string;
  budget: number;
  balance: number;
  user: UserModel;
  currency: CurrencyModel;
  iconName: string;
  billingPeriodStart: number;
  operationQuantity: number;

  constructor(account: Account) {
    this.id = account.id;
    this.name = account.name;
    this.color = account.color;
    this.budget = TransformMoney.fromBackToFront(account.budget);
    this.balance = TransformMoney.fromBackToFront(account.balance);
    this.iconName = account.iconName;
    account.user ? (this.user = account.user.toModel()) : null;
    account.currency ? (this.currency = account.currency.toModel()) : null;
    this.billingPeriodStart = account.billingPeriodStart;
    this.operationQuantity = account.operationQuantity;
  }
}
