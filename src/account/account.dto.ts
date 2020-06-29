import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IconName } from '../utilities/utils';

export class AccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  color: string;
  @IsEnum(IconName)
  iconName: IconName;
  @IsNumber()
  billingPeriodStart: number;
}
