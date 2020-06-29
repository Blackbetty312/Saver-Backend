import { User } from 'src/user/user.entity';
import { Notification } from 'src/notification/notification.entity';
import { Event } from '../event/event.entity';
import { NotificationType } from '../utilities/utils';

export class NotificationModel {
  user: User;
  id: number;
  type: NotificationType;
  title: string;
  date: Date;
  description: string;
  seen: boolean;
  event: Event;

  constructor(notification: Notification) {
    this.id = notification.id;
    this.type = notification.type;
    this.title = notification.title;
    this.date = notification.date;
    this.description = notification.description;
    this.seen = notification.seen;
    this.user = notification.user;
    this.event = notification.event;
  }
}
