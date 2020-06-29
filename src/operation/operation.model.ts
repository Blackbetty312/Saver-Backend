import {
  IntoAccountType,
  OperationType,
  TransformMoney,
} from 'src/utilities/utils';
import { Operation } from 'src/operation/operation.entity';
import { Account } from '../account/account.entity';
import { SubcategoryModel } from '../subcategory/subcategory.model';

export class OperationModel {
  subcategory: SubcategoryModel;
  title: string;
  description: string;
  type: OperationType;
  value: number;
  date: Date;
  intoAccount: IntoAccountType;
  guarantyDays: number;
  account: Account;

  constructor(operation: Operation) {
    this.account = operation.account;
    this.title = operation.title;
    this.description = operation.description;
    this.type = operation.type;
    this.value = TransformMoney.fromBackToFront(operation.value);
    this.date = operation.date;
    this.intoAccount = operation.intoAccount;
    this.guarantyDays = operation.guarantyDays;
    operation.subcategory
      ? (this.subcategory = operation.subcategory.toModel())
      : null;
  }
  toGraph() {
    return {
      value: this.value,
      subcategory: this.subcategory,
      date: this.date,
      type: this.type,
    };
  }
}
