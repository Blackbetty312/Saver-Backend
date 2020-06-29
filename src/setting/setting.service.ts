import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './setting.entity';
import { UserModel } from '../user/user.model';
import { User } from '../user/user.entity';
import { UserDto } from '../user/user.dto';
import { EmailDTO, PasswordDTO } from './setting.dto';

@Injectable()
export class SettingService {
  constructor(
    private readonly userEntity: User,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async changeEmail(userId: number, email: EmailDTO): Promise<UserModel> {
    const user = await this.userRepository.findOneOrFail(userId);
    user.email = email.email;
    await this.userRepository.save(user);
    return user.toModel();
  }

  async changePassword(
    userId: number,
    password: PasswordDTO,
  ): Promise<UserModel> {
    const user = await this.userRepository.findOneOrFail(userId);
    user.password = await this.userEntity.hashPasswordChange(password.password);
    await this.userRepository.save(user);
    return user.toModel();
  }

  async changeAvatar(userId: number, avatar: any): Promise<UserModel> {
    const user = await this.userRepository.findOneOrFail(userId);
    user.avatar = avatar;
    await this.userRepository.save(user);
    return user.toModel();
  }

  async changeInfo(userId: number, userDto: UserDto): Promise<UserModel> {
    const user = await this.userRepository.findOneOrFail(userId);
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.birthDate = userDto.birthDate;
    user.sex = userDto.sex;
    user.nickname = userDto.nickname;
    await this.userRepository.save(user);
    return user.toModel();
  }
}
