import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDTO {
  @IsEmail()
  @IsString()
  email: string;
}

export class PasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;
}
