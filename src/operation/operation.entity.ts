import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/account.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { OperationModel } from './operation.model';
import {
  IntoAccountType,
  OperationDistinction,
  OperationType,
  TransformMoney,
} from 'src/utilities/utils';
import { OperationDTO } from './operation.dto';
import { InstalmentDate } from '../instalmentdate/instalmentdate.entity';
import { Event } from '../event/event.entity';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 150 })
  title: string;
  @Column({ type: 'enum', enum: OperationDistinction })
  distinction: OperationDistinction;
  @Column({ length: 300, nullable: true })
  description: string;
  @Column({ type: 'enum', enum: OperationType })
  type: OperationType;
  @Column()
  value: number;
  @Column()
  date: Date;
  @Column({ type: 'mediumblob', nullable: true })
  file: Buffer;
  @Column({ nullable: true })
  fileName: string;
  @Column({ nullable: true })
  fileMimeType: string;
  @Column({ type: 'enum', enum: IntoAccountType })
  intoAccount: IntoAccountType;
  @Column({ default: 0 })
  guarantyDays: number;
  @ManyToOne(
    type => Account,
    account => account.operations,
  )
  account: Account;
  @ManyToOne(
    type => Subcategory,
    subcategory => subcategory.operations,
  )
  subcategory: Subcategory;
  @ManyToOne(
    type => Event,
    event => event.operations,
  )
  event: Event;

  public static fromDTO(
    account: Account,
    subcategory: Subcategory,
    model: OperationDTO,
  ): Operation {
    const operation = new Operation();
    operation.title = model.title;
    operation.description = model.description;
    operation.type = model.type;
    operation.value = TransformMoney.fromFrontToBack(model.value);
    operation.intoAccount = model.intoAccount;
    operation.guarantyDays = model.guarantyDays;
    operation.account = account;
    operation.subcategory = subcategory;
    operation.distinction = model.distinction;
    operation.date = new Date();
    return operation;
  }

  public static fromInstalment(instalmentDate: InstalmentDate): Operation {
    const newOperation = new Operation();
    newOperation.title = instalmentDate.instalment.title;
    newOperation.description =
      instalmentDate.instalment.description +
      '(' +
      new Date().toLocaleString('pl-PL') +
      ')';
    newOperation.type = OperationType.OUT;
    newOperation.value = instalmentDate.value;
    newOperation.intoAccount = instalmentDate.instalment.intoAccount;
    newOperation.account = instalmentDate.instalment.account;
    newOperation.subcategory = instalmentDate.instalment.subcategory;
    newOperation.distinction = OperationDistinction.INSTALMENT;
    newOperation.date = new Date();
    return newOperation;
  }

  public toModel(): OperationModel {
    return new OperationModel(this);
  }
}
