import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';
import { Notification } from 'src/notification/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification]), UserModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
