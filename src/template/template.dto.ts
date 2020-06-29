import { IsNumber, IsString, IsEnum } from 'class-validator';
import { OperationType, IntoAccountType } from 'src/utilities/utils';

export class TemplateDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsEnum(OperationType)
  type: OperationType;
  @IsNumber()
  value: number;
  @IsEnum(IntoAccountType)
  intoAccount: IntoAccountType;
}
