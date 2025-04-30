import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { RegisterDto } from 'apps/user-service/src';

@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  // @Get()
  // getHello(): string {
  //   return this.authServiceService.getHello();
  // }

  @Post('register')
  async createUser(@Body() userDto: RegisterDto) {
    // console.log(userDto);

    return await this.authServiceService.createUser(userDto);
  }
}
