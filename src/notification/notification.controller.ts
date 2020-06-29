import { UseGuards, Controller, Post, Param, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationDTO } from './notification.dto';
import { NotificationModel } from './notification.model';
import { NotificationService } from './notification.service';

@Controller('notification')
@UseGuards(AuthGuard('jwt'))
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/add/:userId')
  addNotification(
    @Param('userId') userId: number,
    @Body() notificationDTO: NotificationDTO,
  ): Promise<NotificationModel> {
    return this.notificationService.addNotification(userId, notificationDTO);
  }

  @Get('all/:userid')
  getNotificationList(@Param('userid') userId: number) {
    return this.notificationService.getNotificationList(userId);
  }

  @Post('mark/:id')
  markNotificationAsRead(
    @Param('id') notificationId: number,
    @Body() notificationDTO: NotificationDTO,
  ): Promise<NotificationModel> {
    return this.notificationService.markNotificationAsRead(
      notificationId,
      notificationDTO,
    );
  }
}
