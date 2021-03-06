import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Account } from '../account/account.entity';
import { Notification } from '../notification/notification.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Account, Notification, User])],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
