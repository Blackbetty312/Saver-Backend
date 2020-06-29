import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Notification } from 'src/notification/notification.entity';
import { Repository } from 'typeorm';
import { NotificationDTO } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addNotification(userId: number, notificationDTO: NotificationDTO) {
    const user = await this.userRepository.findOneOrFail(userId);
    const newNotification: Notification = Notification.fromDTO(
      user,
      notificationDTO,
    );
    await this.notificationRepository.save(newNotification);
    return newNotification.toModel();
  }

  async getNotificationList(userId: number) {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(userId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const notification: Notification[] = await this.notificationRepository.find(
      { relations: ['event'], where: { user } },
    );
    return notification.map((notification: Notification) =>
      notification.toModel(),
    );
  }

  async markNotificationAsRead(
    notificationId: number,
    notificationDTO: NotificationDTO,
  ) {
    const notification: Notification = await this.notificationRepository
      .findOneOrFail(notificationId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(notificationId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    notification.seen = notificationDTO.seen;
    await this.notificationRepository.save(notification);
    return notification.toModel();
  }
}
