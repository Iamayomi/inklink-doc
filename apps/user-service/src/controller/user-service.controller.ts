import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user-service.service';
import { RegisterDto } from '../model';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from 'yes/common';

@Controller('users')
export class UserServiceController {
  constructor(
    private readonly userService: UserService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('user_created')
  async handleUsercreated(
    @Payload() userDto: RegisterDto,
    // @Ctx() context: RmqContext,
  ) {
    console.log(userDto);

    await this.userService.createUser(userDto);
    // this.rmqService.ack(context);
  }
}
