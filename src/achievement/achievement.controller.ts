import { Controller, UseGuards, Post, Param, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AchievementService } from './achievement.service';
import { AchievementDTO } from './achievement.dto';

@Controller('achievement')
@UseGuards(AuthGuard('jwt'))
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get('recent/:id')
  getRecent(@Param('id') userId: number) {
    return this.achievementService.getThreeRecent(userId);
  }

  @Get('specific/:userId/:achiId')
  getSpecific(
    @Param('userId') userId: number,
    @Param('achiId') achiId: number,
  ) {
    return this.achievementService.isEarned(userId, achiId);
  }

  @Get('all/:id')
  getAll(@Param('id') userId: number) {
    return this.achievementService.getAllUser(userId);
  }

  @Get('allAvailable')
  getAllAvailable() {
    return this.achievementService.getAllAvailible();
  }

  @Get('amount/:id')
  getAmountAchisUser(@Param('id') userId: number) {
    return this.achievementService.amountOfAchisUser(userId);
  }

  @Post('add')
  addAchievement(@Body() achiDTO: AchievementDTO) {
    return this.achievementService.addAchi(achiDTO);
  }
}
