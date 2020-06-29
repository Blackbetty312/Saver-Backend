import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SettingService } from './setting.service';
import { EmailDTO, PasswordDTO } from './setting.dto';
import { UserModel } from '../user/user.model';
import { UserDto } from '../user/user.dto';

@Controller('user-settings')
@UseGuards(AuthGuard('jwt'))
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post('change-email/:id')
  changeEmail(
    @Param('id') userId: number,
    @Body() email: EmailDTO,
  ): Promise<UserModel> {
    return this.settingService.changeEmail(userId, email);
  }

  @Post('change-password/:id')
  changePassword(
    @Param('id') userId: number,
    @Body() password: PasswordDTO,
  ): Promise<UserModel> {
    return this.settingService.changePassword(userId, password);
  }

  @Post('change-avatar/:id')
  changeAvatar(
    @Param() userId: number,
    @Body() avatar: any,
  ): Promise<UserModel> {
    return this.settingService.changeAvatar(userId, avatar);
  }

  @Post('change-info/:id')
  changeInfo(
    @Param() userId: number,
    @Body() userDto: UserDto,
  ): Promise<UserModel> {
    return this.settingService.changeInfo(userId, userDto);
  }
}
