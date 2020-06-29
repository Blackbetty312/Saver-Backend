import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { NotificationModel } from './notification.model';
import { NotificationDTO } from './notification.dto';
import { NotificationType } from '../utilities/utils';
import { Event } from '../event/event.entity';
import { InstalmentDate } from '../instalmentdate/instalmentdate.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;
  @Column({ length: 100 })
  title: string;
  @Column()
  date: Date;
  @Column({ length: 200 })
  description: string;
  @Column()
  seen: boolean;
  @ManyToOne(
    type => User,
    user => user.notifications,
  )
  user: User;
  @ManyToOne(
    type => Event,
    event => event.notifications,
  )
  event: Event;
  @ManyToOne(
    type => InstalmentDate,
    instalmentDate => instalmentDate.notification,
  )
  instalmentDate: InstalmentDate;

  public static fromDTO(user: User, model: NotificationDTO): Notification {
    const notification = new Notification();
    notification.date = model.date;
    notification.description = model.description;
    notification.seen = false;
    notification.user = user;
    notification.title = model.title;
    notification.type = model.type;
    return notification;
  }

  public toModel(): NotificationModel {
    return new NotificationModel(this);
  }
}
