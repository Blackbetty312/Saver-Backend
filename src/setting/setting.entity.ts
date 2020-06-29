import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 6 })
  webMode: string;
  @Column()
  billingPeriodStart: number;
  @Column()
  billingPeriodEnd: number;
  @Column()
  periodLength: number;
  @OneToOne(type => User)
  @JoinColumn()
  user: User;
}
