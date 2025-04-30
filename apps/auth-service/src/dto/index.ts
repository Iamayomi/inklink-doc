import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword({ minLength: 6 }, { message: 'Password not strong enough' })
  password?: string;

  @IsString()
  @IsOptional() // This makes the field optional if you don’t want to always require it
  role?: string; // Optional field
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  twoFactorCode?: string;
}

export class OAuthDto {
  @IsString()
  provider: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
