import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRegisterDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
