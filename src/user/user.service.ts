import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Transaction } from 'typeorm';
import { LoginRegisterDTO } from '../auth/auth.dto';
import { UserDto } from './user.dto';
import { UserModel } from './user.model';
import { Account } from '../account/account.entity';

/**
 * File containing method implementations of CRUD operations for an user.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  /**
   * This method finds user by his email address.
   * @param userDTO User Data Transfer Object that contains credentials of the user.
   */
  async findByLogin(userDTO: LoginRegisterDTO): Promise<UserModel> {
    const { email, password } = userDTO;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new HttpException(
        'Niepoprawne dane logowania',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (await this.checkHash(user.password, password)) {
      return user.toModel();
    } else {
      throw new HttpException(
        'Niepoprawne dane logowania',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * This method checks if the password provided by the user matches that in the database.
   * @param hash Hashed password of the user.
   * @param password Password provided during the login session.
   */
  async checkHash(hash: string, password: string): Promise<boolean> {
    const argon2 = require('argon2');
    try {
      return await argon2.verify(hash, password);
    } catch (err) {
      throw new Error('Internal Failure');
    }
  }

  /**
   * This method registers new user into the database.
   * @param userDTO User Data Transfer Object that contains credentials of the user.
   */
  async registerUser(userDTO: LoginRegisterDTO): Promise<UserModel> {
    const { email } = userDTO;
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser: User = User.fromDTO(userDTO);
    newUser.lastLoginDate = null;
    await this.userRepository.save(newUser);
    return newUser.toModel();
  }

  /**
   * TODO
   * @param payload
   */
  async findByPayload(payload: any) {
    const {
      email: { id },
    } = payload;
    return await this.userRepository.findOne({ id });
  }

  /**
   * This method edits information about the user.
   * @param userId Identifier of the user.
   * @param userDto User Data Transfer Object that contains information about the user.
   */
  async editUser(userId: number, userDto: UserDto): Promise<UserModel> {
    const user = await this.userRepository.findOneOrFail(userId);
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.birthDate = userDto.birthDate;
    user.sex = userDto.sex;
    await this.userRepository.save(user);
    return user.toModel();
  }

  async getUserInfo(userId: number) {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(userId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    //await user.setNickname().catch(console.log);
    return user.toModel();
  }

  async getUserAccountList(userId: number) {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(userId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const accounts: Account[] = await this.accountRepository.find({
      relations: ['currency'],
      where: { user: userId },
    });
    return accounts.map((accounts: Account) => accounts.toModel());
  }

  async increaseLoggedDays(loginDate: Date, userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // wczoraj
    if (
      loginDate.getFullYear() === yesterday.getFullYear() &&
      loginDate.getMonth() === yesterday.getMonth() &&
      loginDate.getDay() === yesterday.getDay()
    ) {
      user.consecutiveLoggedDays++;
    } else if (
      loginDate.getFullYear() === today.getFullYear() &&
      loginDate.getMonth() === today.getMonth() &&
      loginDate.getDay() === today.getDay()
    ) {
      console.log('kolejny login dzis nie zmienia dni logowan');
    } else {
      user.consecutiveLoggedDays = 1;
    }
    await this.userRepository.save(user);
  }

  async getLevel(userId: number) {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(userId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    return user.level;
  }

  async getExp(userId: number) {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(userId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    return user.experience;
  }

  async getUserAccount(userId: number) {
    const user: User = await this.userRepository
      .findOneOrFail(userId)
      .catch(x => {
        throw new HttpException(
          'Niepoprawny request(userId)',
          HttpStatus.BAD_REQUEST,
        );
      });
    const account: Account = await this.accountRepository.findOne({
      relations: ['currency'],
      where: { user: userId },
    });
    return account.toModel();
  }
  async updateLastLogin(userId: number) {
    const user = await this.userRepository.findOne(userId);
    user.lastLoginDate = new Date();
    await this.userRepository.save(user);
  }
}
