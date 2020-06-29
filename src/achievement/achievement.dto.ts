import { IsString, IsNumber } from 'class-validator';

export class AchievementDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  experience: number;
}
