import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user-service.service';
import { RegisterDto } from '../model';

@Controller('users')
export class UserServiceController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: RegisterDto) {
    return await this.userService.createUser(userDto);
  }
}
