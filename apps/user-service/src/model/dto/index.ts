import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional() // This makes the field optional if you don’t want to always require it
  role?: string; // Optional field

  @IsString()
  @IsOptional() // Optional as well
  avatarUrl?: string; // Optional fiel
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
