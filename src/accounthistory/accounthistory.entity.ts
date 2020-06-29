import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class AccountHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  budget: number;
  @Column()
  balance: number;
  @Column({ default: 0 })
  operationQuantity: number;
  @Column()
  totalExpenditure: number;
  @Column()
  totalIncome: number;
  @Column()
  maxExpenditure: number;
  @Column()
  minExpenditure: number;
  @Column()
  avgExpenditure: number;
  @Column()
  maxIncome: number;
  @Column()
  minIncome: number;
  @Column()
  avgIncome: number;
  @CreateDateColumn()
  reportDate: Date;
  @ManyToOne(
    type => Account,
    account => account.accountHistories,
  )
  account: Account;
}
