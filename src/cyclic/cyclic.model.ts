import {
  IntoAccountType,
  OperationType,
  TransformMoney,
} from '../utilities/utils';
import { Cyclic } from './cyclic.entity';
import { SubcategoryModel } from '../subcategory/subcategory.model';

export class CyclicModel {
  id: number;
  title: string;
  description: string;
  value: number;
  howOften: number;
  nextDate: Date;
  subcategory: SubcategoryModel;
  type: OperationType;
  intoAccount: IntoAccountType;
  endDate: Date;
  summaryValue: number;

  constructor(cyclic: Cyclic, summary?: number) {
    this.id = cyclic.id;
    this.title = cyclic.title;
    this.description = cyclic.description;
    this.value = TransformMoney.fromBackToFront(cyclic.value);
    this.howOften = cyclic.howOften;
    this.nextDate = cyclic.nextDate;
    cyclic.subcategory
      ? (this.subcategory = cyclic.subcategory.toModel())
      : null;
    this.type = cyclic.type;
    this.intoAccount = cyclic.intoAccount;
    this.endDate = cyclic.endDate;
    summary ? (this.summaryValue = TransformMoney.fromBackToFront(summary)) : 0;
  }
}
