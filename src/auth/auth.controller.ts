import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginRegisterDTO } from './auth.dto';
import { verify } from 'jsonwebtoken';
import { AchievementService } from 'src/achievement/achievement.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly achiService: AchievementService,
  ) {}

  @Post('auth/verify-token/:token')
  verifyToken(@Param('token') token: string) {
    return verify(token, process.env.SECRET, function(err) {
      if (err) {
        throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
      }
      return true;
    });
  }

  @Post('register')
  async register(@Body() userDTO: LoginRegisterDTO): Promise<any> {
    const user = await this.userService.registerUser(userDTO);
    const payload = {
      email: user,
    };
    const token = await this.authService.signByPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() userDTO: LoginRegisterDTO) {
    let firstLogin = false;
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      email: user,
    };
    const token = await this.authService.signByPayload(payload);
    if (!user.lastLoginDate) {
      firstLogin = true;
      this.achiService.firstLoginAchi(user.id);
    }
    user.lastLoginDate = new Date();
    await this.userService.increaseLoggedDays(new Date(), user.id);
    await this.achiService.loginMilestone(user.id);
    await this.userService.updateLastLogin(user.id);
    return { user, token, firstLogin };
  }
}
