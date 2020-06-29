import { IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationType } from '../utilities/utils';

export class NotificationDTO {
  @IsEnum(NotificationType)
  type: NotificationType;
  @IsString()
  title: string;
  @Type(() => Date)
  date: Date;
  @IsString()
  description: string;
  seen: boolean;
}
