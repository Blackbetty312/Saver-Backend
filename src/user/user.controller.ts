import { Body, Controller, Param, Post, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './user.dto';

/**
 * Controller responsible for CRUD operations on user.
 */
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * This endpoint edits information about the user.
   * @param userId User's identifier.
   * @param userDto Data Transfer Object containing information about the user.
   */
  @Post('edit/:id')
  editUser(
    @Param('id') userId: number,
    @Body() userDto: UserDto,
  ): Promise<UserModel> {
    return this.userService.editUser(userId, userDto);
  }

  @Get(':id/info')
  getUserInfo(@Param('id') userId: number) {
    return this.userService.getUserInfo(userId);
  }

  @Get('level/:id')
  getLevel(@Param('id') userId: number) {
    return this.userService.getLevel(userId);
  }

  @Get('experience/:id')
  getExperience(@Param('id') userId: number) {
    return this.userService.getExp(userId);
  }

  @Get(':id/account')
  getUserAccount(@Param('id') userId: number) {
    return this.userService.getUserAccount(userId);
  }

  @Get(':id/accountlist')
  getUserAccountList(@Param('id') userId: number) {
    return this.userService.getUserAccountList(userId);
  }
}
