import { Achievement } from './achievement.entity';
import { User } from 'src/user/user.entity';

export class AchievementModel {
  id: number;
  title: string;
  experience: number;
  description: string;
  userAchievement: User[];
  constructor(achivement: Achievement) {
    this.id = achivement.id;
    this.title = achivement.title;
    this.experience = achivement.experience;
    this.description = achivement.description;
  }
}
