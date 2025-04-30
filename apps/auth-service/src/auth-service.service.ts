import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from 'yes/common/constants';
import { CreateUserDto } from './dto';

@Injectable()
export class AuthServiceService {
  constructor(@Inject(USER_SERVICE) private userClient: ClientProxy) {}

  public async createUser(data: CreateUserDto) {
    this.userClient.emit('user_created', data);

    return { message: 'user successful' };
  }
}
