import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  IntoAccountType,
  OperationDistinction,
  OperationType,
} from '../utilities/utils';
import { Cyclic } from '../cyclic/cyclic.entity';

export class OperationDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(OperationType)
  type: OperationType;

  @IsNumber()
  value: number;

  @Type(() => Date)
  date: Date;

  @IsEnum(IntoAccountType)
  intoAccount: IntoAccountType;
  guarantyDays: number;
  distinction: OperationDistinction;
  file: Buffer;

  public static fromCyclic(cyclic: Cyclic): OperationDTO {
    const operation = new OperationDTO();
    operation.title = cyclic.title;
    operation.description = cyclic.description;
    operation.type = cyclic.type;
    operation.value = cyclic.value;
    operation.intoAccount = IntoAccountType.YES;
    operation.distinction = OperationDistinction.CYCLIC;
    return operation;
  }
}
