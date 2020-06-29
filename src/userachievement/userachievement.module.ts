import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Achievement } from 'src/achievement/achievement.entity';
import { User } from 'src/user/user.entity';
import { UserAchievement } from './userachievement.entity';
import { UserAchievementController } from './userAchievement.controller';
import { UserAchievementService } from './userachievement.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Achievement, UserAchievement])],
  providers: [UserAchievementService],
  controllers: [UserAchievementController],
  exports: [UserAchievementService],
})
export class UserAchievementModule {}
