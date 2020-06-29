import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Instalment } from '../instalment/instalment.entity';
import { InstalmentDateModel } from './instalmentdate.model';
import { Notification } from '../notification/notification.entity';

@Entity()
export class InstalmentDate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: Date;
  @Column()
  value: number;
  @Column({ default: false })
  paid: boolean;
  @ManyToOne(
    type => Instalment,
    instalment => instalment.instalmentsdate,
  )
  instalment: Instalment;

  @OneToMany(
    type => Notification,
    notification => notification.instalmentDate,
  )
  notification: Notification;
  public toModel(): InstalmentDateModel {
    return new InstalmentDateModel(this);
  }
}
