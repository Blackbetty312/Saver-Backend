import { IntoAccountType, OperationType } from '../utilities/utils';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export class CyclicDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsPositive()
  value: number;
  @IsNumber()
  howOften: number;
  @IsEnum(OperationType)
  type: OperationType;
  @IsEnum(IntoAccountType)
  intoAccount: IntoAccountType;
}
