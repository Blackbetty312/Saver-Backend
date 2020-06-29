import { IntoAccountType, TransformMoney } from 'src/utilities/utils';
import { Instalment } from './instalment.entity';
import { SubcategoryModel } from '../subcategory/subcategory.model';
import { InstalmentDateModel } from '../instalmentdate/instalmentdate.model';
import { InstalmentDate } from '../instalmentdate/instalmentdate.entity';

export class InstalmentModelBasic {
  id?: number;
  title: string;
  dateFrom: Date;
  dateTo?: Date;
  instalmentDates: number;
  paidValue?: number;
  totalValue: number;
  subcategory: SubcategoryModel;
  intoAccount: IntoAccountType;

  constructor(instalment: Instalment, paidValue?: number) {
    this.id = instalment.id;
    this.title = instalment.title;
    this.dateFrom = instalment.dateFrom;
    instalment.dateTo ? (this.dateTo = instalment.dateTo) : null;
    this.instalmentDates = instalment.numOfInstalment;
    this.totalValue = TransformMoney.fromBackToFront(instalment.value);
    instalment.subcategory
      ? (this.subcategory = instalment.subcategory.toModel())
      : null;
    this.intoAccount = instalment.intoAccount;
    instalment.valuePaid
      ? (this.paidValue = TransformMoney.fromBackToFront(instalment.valuePaid))
      : null;
  }
}

export class InstalmentModelExtended extends InstalmentModelBasic {
  description: string;
  elements: InstalmentDateModel[];

  constructor(instalment: Instalment) {
    super(instalment);
    this.description = instalment.description;
    instalment.instalmentsdate
      ? (this.elements = instalment.instalmentsdate.map((x: InstalmentDate) => {
          return x.toModel();
        }))
      : null;
  }
}
