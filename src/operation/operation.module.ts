import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './operation.entity';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { Subcategory } from '../subcategory/subcategory.entity';
import { Notification } from '../notification/notification.entity';
import { Account } from '../account/account.entity';
import { AccountModule } from '../account/account.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { User } from 'src/user/user.entity';
import { AchievementModule } from 'src/achievement/achievement.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Operation,
      Account,
      Subcategory,
      Notification,
      User,
    ]),
    AccountModule,
    NotificationModule,
    SubcategoryModule,
    AchievementModule,
  ],
  providers: [OperationService],
  controllers: [OperationController],
  exports: [OperationService],
})
export class OperationModule {}
