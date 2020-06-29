import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AchievementDTO } from './achievement.dto';
import { UserAchievement } from 'src/userachievement/userachievement.entity';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 45 })
  title: string;
  @Column('int', { default: 0 })
  experience: number;
  @Column({ length: 500 })
  description: string;

  @OneToMany(
    type => UserAchievement,
    userAchievement => userAchievement.achievement,
  )
  userAchievement: UserAchievement[];

  public static fromDTO(model: AchievementDTO): Achievement {
    const achi = new Achievement();
    achi.description = model.description;
    achi.experience = model.experience;
    achi.title = model.title;
    return achi;
  }
}
