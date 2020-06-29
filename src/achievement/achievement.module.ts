import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from '../currency/currency.entity';
import { User } from '../user/user.entity';
import { Operation } from '../operation/operation.entity';
import { Account } from 'src/account/account.entity';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';
import { Achievement } from './achievement.entity';
import { UserAchievement } from 'src/userachievement/userachievement.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      Currency,
      User,
      Operation,
      Achievement,
      UserAchievement,
    ]),
    EventModule,
  ],
  providers: [AchievementService],
  controllers: [AchievementController],
  exports: [AchievementService],
})
export class AchievementModule {}
