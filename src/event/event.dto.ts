import { IntoAccountType, PredefinedEvent } from '../utilities/utils';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EventDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  value: number;
  @Type(() => Date)
  dateFrom: Date;
  @Type(() => Date)
  dateTo: Date;
  @Type(() => Date)
  whenNotification: Date;
  @IsString()
  color: string;
  @IsEnum(IntoAccountType)
  intoAccount: IntoAccountType;
  @IsBoolean()
  isRepeating: boolean;
  @IsEnum(PredefinedEvent)
  predefined: PredefinedEvent;
}
