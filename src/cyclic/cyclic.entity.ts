import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/account.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { CyclicDTO } from './cyclic.dto';
import {
  IntoAccountType,
  OperationType,
  TransformMoney,
} from '../utilities/utils';
import { CyclicModel } from './cyclic.model';

@Entity()
export class Cyclic {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  value: number;
  @Column({ type: 'enum', enum: OperationType })
  type: OperationType;
  @Column({ nullable: true })
  endDate: Date;
  @Column({ type: 'enum', enum: IntoAccountType })
  intoAccount: IntoAccountType;
  @Column({ nullable: true })
  howOften: number;
  @Column({ nullable: true })
  nextDate: Date;
  @ManyToOne(
    type => Account,
    account => account.cyclics,
  )
  account: Account;
  @ManyToOne(
    type => Subcategory,
    subcategory => subcategory.id,
  )
  subcategory: Subcategory;

  public static fromDTO(
    account: Account,
    subcategory: Subcategory,
    model: CyclicDTO,
  ) {
    const cyclic = new Cyclic();
    cyclic.title = model.title;
    cyclic.description = model.description;
    cyclic.value = TransformMoney.fromFrontToBack(model.value);
    cyclic.type = model.type;
    cyclic.intoAccount = model.intoAccount;
    cyclic.howOften = model.howOften;
    cyclic.subcategory = subcategory;
    cyclic.account = account;
    return cyclic;
  }

  public toModel(summary?: number): CyclicModel {
    return new CyclicModel(this, summary);
  }
}
