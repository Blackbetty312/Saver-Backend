import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from '../report/report.entity';
import { Event } from '../event/event.entity';
import { Currency } from '../currency/currency.entity';
import { Cyclic } from '../cyclic/cyclic.entity';
import { User } from '../user/user.entity';
import { Operation } from '../operation/operation.entity';
import { Instalment } from '../instalment/instalment.entity';
import { AccountDto } from './account.dto';
import { AccountModel } from './account.model';
import { AccountHistory } from '../accounthistory/accounthistory.entity';
import { IconName } from '../utilities/utils';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 45 })
  name: string;
  @Column({ length: 45 })
  color: string;
  @Column({ default: 0 })
  budget: number;
  @Column({ default: 0 })
  balance: number;
  @Column({ default: 1 })
  billingPeriodStart: number;
  @Column({ default: 29 })
  billingPeriodEnd: number;
  @Column({ default: 0 })
  periodLength: number;

  @Column({ default: 0 })
  operationQuantity: number;
  @Column({ type: 'enum', enum: IconName })
  iconName: IconName;
  @OneToMany(
    type => Report,
    reports => reports.account,
  )
  reports: Report[];
  @OneToMany(
    type => Event,
    events => events.account,
  )
  events: Event[];
  @OneToMany(
    type => Cyclic,
    cyclics => cyclics.account,
  )
  cyclics: Cyclic[];
  @OneToMany(
    type => Operation,
    operations => operations.account,
  )
  operations: Operation[];
  @ManyToOne(
    type => Currency,
    currency => currency.accounts,
  )
  currency: Currency;
  @ManyToOne(
    type => User,
    user => user.accounts,
  )
  user: User;
  @OneToMany(
    type => Instalment,
    instalments => instalments.account,
  )
  instalments: Instalment[];

  @OneToMany(
    type => AccountHistory,
    accountHistories => accountHistories.account,
  )
  accountHistories: AccountHistory[];

  public static fromDTO(
    user: User,
    currency: Currency,
    model: AccountDto,
  ): Account {
    const account = new Account();
    account.name = model.name;
    account.color = model.color;
    account.user = user;
    account.currency = currency;
    account.iconName = model.iconName;
    account.billingPeriodStart = model.billingPeriodStart;
    if (account.billingPeriodStart === 1) {
      account.billingPeriodEnd = 29;
    } else {
      account.billingPeriodEnd = account.billingPeriodStart - 1;
    }
    return account;
  }

  public toModel(): AccountModel {
    return new AccountModel(this);
  }
}
