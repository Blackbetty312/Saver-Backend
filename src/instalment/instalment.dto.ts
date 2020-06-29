import { IntoAccountType } from 'src/utilities/utils';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class InstalmentDTO {
  @IsString()
  title: string;
  @Type(() => Date)
  dateFrom: Date;
  @IsString()
  description: string;
  @IsNumber()
  value: number;
  @IsEnum(IntoAccountType)
  intoAccount: IntoAccountType;
  @IsNumber()
  numOfInstalment: number;
}
