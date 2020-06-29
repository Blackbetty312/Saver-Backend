import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/account.entity';
import { CurrencyModel } from './currency.model';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 20 })
  name: string;
  @Column({ length: 3 })
  code: string;
  @Column({ length: 25, nullable: true })
  symbol: string;
  @OneToMany(
    type => Account,
    accounts => accounts.currency,
  )
  accounts: Account[];

  public toModel(): CurrencyModel {
    return new CurrencyModel(this);
  }
}
