import { Event } from './event.entity';
import {
  IntoAccountType,
  PredefinedEvent,
  TransformMoney,
} from '../utilities/utils';
import { Operation } from '../operation/operation.entity';
import { Account } from '../account/account.entity';
import { AccountModel } from '../account/account.model';

export class EventModelBasic {
  id?: number;
  title: string;
  dateFrom: Date;
  dateTo: Date;
  color: string;
  predefined: PredefinedEvent;
  operations: Operation[];

  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
    this.dateFrom = event.dateFrom;
    this.dateTo = event.dateTo;
    this.color = event.color;
    this.predefined = event.predefined;
    event.operations
      ? (this.operations = event.operations.map(x => {
          x.value = TransformMoney.fromBackToFront(x.value);
          return x;
        }))
      : null;
  }
}

export class EventModel extends EventModelBasic {
  description?: string;
  value?: number;
  intoAccount: IntoAccountType;
  operations: Operation[];
  whenNotification: Date;
  isRepeating: boolean;
  account: AccountModel;

  constructor(event: Event) {
    super(event);
    this.description = event.description;
    this.value = TransformMoney.fromBackToFront(event.value);
    this.intoAccount = event.intoAccount;
    this.whenNotification = event.whenNotification;
    this.isRepeating = event.isRepeating;
    event.operations ? (this.operations = event.operations) : null;
    event.account ? (this.account = event.account.toModel()) : null;
  }
}
