import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Achievement } from './achievement.entity';
import { AchievementDTO } from './achievement.dto';
import { UserAchievement } from 'src/userachievement/userachievement.entity';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
    @InjectRepository(UserAchievement)
    private readonly userAchievementRepository: Repository<UserAchievement>,
  ) {}

  async addAchi(achi: AchievementDTO) {
    const newAchi = Achievement.fromDTO(achi);
    await this.achievementRepository.save(newAchi);
  }

  async operationMilestone(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    const userAchi = new UserAchievement();
    userAchi.user = user;
    if (user.totalOperations === 1) {
      const achievement = await this.achievementRepository.findOneOrFail(1);
      userAchi.achievement = achievement;
    } else if (user.totalOperations === 5) {
      const achievement = await this.achievementRepository.findOneOrFail(2);
      userAchi.achievement = achievement;
    } else if (user.totalOperations === 25) {
      const achievement = await this.achievementRepository.findOneOrFail(3);
      userAchi.achievement = achievement;
    } else if (user.totalOperations === 100) {
      const achievement = await this.achievementRepository.findOneOrFail(4);
      userAchi.achievement = achievement;
    } else if (user.totalOperations === 500) {
      const achievement = await this.achievementRepository.findOneOrFail(5);
      userAchi.achievement = achievement;
    } else if (user.totalOperations === 1000) {
      const achievement = await this.achievementRepository.findOneOrFail(6);
      userAchi.achievement = achievement;
    }
    if (userAchi.achievement) {
      await this.userAchievementRepository.save(userAchi);
    }
  }

  async loginMilestone(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    const userAchi = new UserAchievement();
    userAchi.user = user;
    if (user.consecutiveLoggedDays === 5) {
      const achievement = await this.achievementRepository.findOneOrFail(7);
      userAchi.achievement = achievement;
    } else if (user.consecutiveLoggedDays === 30) {
      const achievement = await this.achievementRepository.findOneOrFail(8);
      userAchi.achievement = achievement;
    } else if (user.consecutiveLoggedDays === 90) {
      const achievement = await this.achievementRepository.findOneOrFail(9);
      userAchi.achievement = achievement;
    } else if (user.consecutiveLoggedDays === 180) {
      const achievement = await this.achievementRepository.findOneOrFail(10);
      userAchi.achievement = achievement;
    } else if (user.consecutiveLoggedDays === 360) {
      const achievement = await this.achievementRepository.findOneOrFail(11);
      userAchi.achievement = achievement;
    }
    if (userAchi.achievement) {
      await this.userAchievementRepository.save(userAchi);
    }
  }
  async firstLoginAchi(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    const userAchi = new UserAchievement();
    const achievement = await this.achievementRepository.findOneOrFail(13);

    userAchi.user = user;
    userAchi.achievement = achievement;

    await this.userAchievementRepository.save(userAchi);
  }
  async getAllUser(userId: number) {
    const achis = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userAchievements', 'achi')
      .leftJoinAndSelect('achi.achievement', 'oneAchievement')
      .where('achi.userId = :uid', { uid: userId })
      .getOne();
    return achis.userAchievements;
  }
  async amountOfAchisUser(userId: number) {
    const achis = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userAchievements', 'achi')
      .leftJoinAndSelect('achi.achievement', 'oneAchievement')
      .where('achi.userId = :uid', { uid: userId })
      .getOne();
    return achis.userAchievements.length;
  }
  async getAllAvailaible() {
    const achis = await this.achievementRepository
      .createQueryBuilder('achievement')
      .getMany();

    return achis;
  }

  async getThreeRecent(userId: number) {
    const arr = this.getAllUser(userId);
    return (await arr)
      .sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      })
      .slice(0, 3);
  }

  async isEarned(userId: number, achiId: number) {
    const userAchi = await this.userAchievementRepository
      .createQueryBuilder('user_achievement')
      .where('user_achievement.userId = :uid', { uid: userId })
      .andWhere('user_achievement.achievementId = :aid', { aid: achiId })
      .getOne();

    return !!userAchi;
  }

  async getAllAvailible() {
    const achis = await this.achievementRepository
      .createQueryBuilder('achievement')
      .getMany();

    return achis;
  }
}
