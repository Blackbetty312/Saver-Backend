import { User } from './user.entity';
import { Sex } from '../utilities/utils';

export class UserModel {
  id: number;
  email: string;
  nickname: string;
  title: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  sex: Sex;
  registerDate: Date;
  level: number;
  experience: number;
  isActive: boolean;
  isPremium: boolean;
  consecutiveLoggedDays: number;
  lastLoginDate: Date;
  totalOperations: number;
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickname = user.nickname;
    this.title = user.title;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.birthDate = user.birthDate;
    this.sex = user.sex;
    this.registerDate = user.registerDate;
    this.level = user.level;
    this.experience = user.experience;
    this.isActive = user.isActive;
    this.isPremium = user.isPremium;
    this.consecutiveLoggedDays = user.consecutiveLoggedDays;
    this.lastLoginDate = user.lastLoginDate;
    this.totalOperations = user.totalOperations;
  }
}
