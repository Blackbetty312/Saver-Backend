import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { Subcategory } from '../subcategory/subcategory.entity';
import { InstalmentDate } from '../instalmentdate/instalmentdate.entity';
import { IntoAccountType, TransformMoney } from '../utilities/utils';
import {
  InstalmentModelBasic,
  InstalmentModelExtended,
} from './instalment.model';
import { InstalmentDTO } from './instalment.dto';

@Entity()
export class Instalment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 150 })
  title: string;
  @Column()
  dateFrom: Date;
  @Column()
  dateTo: Date;
  @Column({ length: 300 })
  description: string;
  @Column()
  value: number;
  @Column({ enum: IntoAccountType, type: 'enum' })
  intoAccount: IntoAccountType;
  @Column()
  numOfInstalment: number;
  @Column({ default: 0 })
  valuePaid: number;
  @Column({ type: 'blob', nullable: true })
  file: string;
  @ManyToOne(
    type => Account,
    account => account.instalments,
  )
  account: Account;
  @ManyToOne(
    type => Subcategory,
    subcategory => subcategory.id,
  )
  subcategory: Subcategory;
  @OneToMany(
    type => InstalmentDate,
    instalmentsdate => instalmentsdate.instalment,
  )
  instalmentsdate: InstalmentDate[];

  public static fromDto(model: InstalmentDTO, subcategory: Subcategory) {
    const newInstalment = new Instalment();
    newInstalment.title = model.title;
    newInstalment.dateFrom = model.dateFrom;
    newInstalment.description = model.description;
    newInstalment.value = TransformMoney.fromFrontToBack(model.value);
    newInstalment.intoAccount = model.intoAccount;
    newInstalment.subcategory = subcategory;
    newInstalment.numOfInstalment = model.numOfInstalment;
    return newInstalment;
  }

  public toModelBasic(): InstalmentModelBasic {
    return new InstalmentModelBasic(this);
  }
  public toModel(): InstalmentModelExtended {
    return new InstalmentModelExtended(this);
  }
}
