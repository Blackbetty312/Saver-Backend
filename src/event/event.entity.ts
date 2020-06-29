import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../account/account.entity';
import { EventDto } from './event.dto';
import {
  IntoAccountType,
  PredefinedEvent,
  TransformMoney,
} from '../utilities/utils';
import { EventModel, EventModelBasic } from './event.model';
import { Operation } from '../operation/operation.entity';
import { Notification } from '../notification/notification.entity';

/**
 * This entity describes the Event table.
 */
@Entity()
export class Event {
  /**
   * Identifier of the event.
   */
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * Title of the event.
   */
  @Column({ length: 45 })
  title: string;
  /**
   * Description of the event.
   */
  @Column({ length: 500 })
  description: string;
  /**
   * Estimated value of money for event.
   */
  @Column()
  value: number;
  /**
   * Starting date of the event.
   */
  @Column({ nullable: true })
  dateFrom: Date;
  /**
   * Ending date of the event.
   */
  @Column({ nullable: true })
  dateTo: Date;
  /**
   * Option that specifies if the event is longer than 1 day.
   */
  @Column({ nullable: true })
  isMultiDay: boolean;
  /**
   * Number of days that event takes long.
   */
  @Column({ nullable: true })
  howMuchDays: number;
  /**
   * Option that specifies if the event is repeats through the calendar.
   */
  @Column({ nullable: true })
  isRepeating: boolean;
  /**
   * Number every how many the days event repeats.
   */
  @Column({ nullable: true })
  howOften: number;
  @Column({ nullable: true })
  whenNotification: Date;
  @Column({ default: false })
  notificationSent: boolean;
  @Column({ type: 'enum', enum: PredefinedEvent })
  predefined: PredefinedEvent;
  @Column({ length: 45 })
  color: string;
  /**
   * Option that specifies if the event is taken into the consideration.
   */
  @Column({ type: 'enum', enum: IntoAccountType })
  intoAccount: IntoAccountType;
  @ManyToOne(
    type => Account,
    account => account.events,
  )
  account: Account;
  @OneToMany(
    type => Operation,
    operations => operations.event,
  )
  operations: Operation[];
  @OneToMany(
    type => Notification,
    notifications => notifications.event,
  )
  notifications: Notification[];

  public static fromDTO(account: Account, model: EventDto): Event {
    const event = new Event();
    event.account = account;
    event.title = model.title;
    event.description = model.description;
    event.value = TransformMoney.fromFrontToBack(model.value);
    event.dateFrom = model.dateFrom;
    event.dateTo = model.dateTo;
    event.intoAccount = model.intoAccount;
    event.whenNotification = model.whenNotification;
    event.color = model.color;
    event.isRepeating = model.isRepeating;
    event.predefined = model.predefined;
    return event;
  }

  public toModelBasic(): EventModelBasic {
    return new EventModelBasic(this);
  }

  public toModel(): EventModel {
    return new EventModel(this);
  }
}
