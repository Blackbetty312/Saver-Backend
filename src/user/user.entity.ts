import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Notification } from '../notification/notification.entity';
import { Achievement } from '../achievement/achievement.entity';
import { Userstasks } from '../userstasks/userstasks.entity';
import { Account } from '../account/account.entity';
import { Template } from '../template/template.entity';
import { UserModel } from './user.model';
import * as argon2 from 'argon2';
import { LoginRegisterDTO } from '../auth/auth.dto';
import { Sex } from '../utilities/utils';
import { Category } from '../category/category.entity';
import { UserAchievement } from 'src/userachievement/userachievement.entity';

/**
 * This entity describes the User table.
 */
@Entity()
export class User {
  /**
   * Identifier of the user.
   */
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * E-mail address of the user.
   */
  @Column({ length: 45 })
  email: string;
  /**
   * Password of the user.
   */
  @Column({ length: 98 })
  password: string;
  /**
   * Nickname of the user.
   */
  @Column({ length: 45, nullable: true })
  nickname: string;
  /**
   * Title of the user.
   */
  @Column({ length: 45, nullable: true })
  title: string;
  /**
   * First name of the user.
   */
  @Column({ length: 45, nullable: true })
  firstName: string;
  /**
   * Last name of the user.
   */
  @Column({ length: 45, nullable: true })
  lastName: string;
  /**
   * Date of birthday of the user.
   */
  @Column({ nullable: true })
  birthDate: Date;
  /**
   * Sex of the user.
   */
  @Column({ type: 'enum', enum: Sex, nullable: true })
  sex: Sex;
  /**
   * Date of the registration of the user.
   */
  @CreateDateColumn()
  registerDate: Date;

  @Column({ nullable: true })
  lastLoginDate: Date;
  /**
   * Level account of the user.
   */
  @Column('int', { default: 1 })
  level: number;
  /**
   * Number that specifies amount of experience of the user.
   */
  @Column('int', { default: 100 })
  experience: number;
  /**
   * Option that specifies if the user is active or not.
   */
  @Column({ default: false })
  isActive: boolean;
  /**
   * Option that specifies if the user has premium type of the account or not.
   */
  @Column({ default: false })
  isPremium: boolean;

  @Column('int', { default: 1 })
  consecutiveLoggedDays: number;

  @Column('int', { default: 0 })
  totalOperations: number;

  @OneToMany(
    type => UserAchievement,
    userAchievement => userAchievement.user,
  )
  userAchievements: UserAchievement[];

  /**
   * File that contains avatar of the user.
   */
  @Column('blob', { nullable: true })
  avatar: string;
  @OneToMany(
    type => Notification,
    notifications => notifications.user,
  )
  notifications: Notification[];

  @OneToMany(
    type => Userstasks,
    userstasks => userstasks.userId,
  )
  userstasks: Userstasks[];
  @OneToMany(
    type => Account,
    accounts => accounts.user,
  )
  accounts: Account[];
  @OneToMany(
    type => Template,
    templates => templates.id,
  )
  templates: Template[];
  /*@OneToMany(
    type => Subcategory,
    subcategory => subcategory.id,
    )
  subcategory: Subcategory[];*/
  @OneToMany(
    type => Category,
    category => category.user,
  )
  categories: Category[];

  getPassword(): string {
    return this.password;
  }

  getId(): number {
    return this.id;
  }

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await argon2.hash(this.password);
    } catch (e) {
      console.log(e);
      throw new Error('Hashing password problem');
    }
  }

  @BeforeInsert()
  async setNickname() {
    this.nickname = this.email.substring(0, this.email.indexOf('@'));
  }

  async hashPasswordChange(password: string) {
    try {
      return await argon2.hash(password);
      //this.password = await argon2.hash(password);
    } catch (e) {
      console.log(e);
      throw new Error('Hashing password problem');
    }
  }

  public static fromDTO(newUserDto: LoginRegisterDTO) {
    const user = new User();
    user.email = newUserDto.email;
    user.password = newUserDto.password;
    return user;
  }

  public toModel(): UserModel {
    return new UserModel(this);
  }
}
