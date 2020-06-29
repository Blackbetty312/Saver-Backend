import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Achievement } from 'src/achievement/achievement.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class UserAchievement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => User,
    user => user.userAchievements,
  )
  user: User;
  @ManyToOne(
    type => Achievement,
    achievement => achievement.userAchievement,
  )
  achievement: Achievement;

  @CreateDateColumn()
  date: Date;
}
