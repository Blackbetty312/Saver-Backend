import { InstalmentDate } from './instalmentdate.entity';
import { TransformMoney } from '../utilities/utils';
import { InstalmentModelExtended } from '../instalment/instalment.model';

export class InstalmentDateModel {
  date: Date;
  value: number;
  paid: boolean;
  instalment: InstalmentModelExtended;
  constructor(instalmentDate: InstalmentDate) {
    this.date = instalmentDate.date;
    this.value = TransformMoney.fromBackToFront(instalmentDate.value);
    this.paid = instalmentDate.paid;
    instalmentDate.instalment
      ? (this.instalment = instalmentDate.instalment.toModel())
      : null;
  }
}
