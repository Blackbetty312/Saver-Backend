import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Sex } from '../utilities/utils';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object containing information about the user.
 */
export class UserDto {
  /**
   * First name of the user.
   */
  @IsString()
  firstName: string;
  /**
   * Last name of the user.
   */
  @IsString()
  lastName: string;
  /**
   * Date of birthday of the user.
   */
  // @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthDate: Date;
  /**
   * Sex of the user.
   */
  @IsEnum(Sex)
  @IsOptional()
  sex: Sex;
  @IsString()
  @IsOptional()
  nickname: string;
}
