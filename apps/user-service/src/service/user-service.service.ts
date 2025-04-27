import { Injectable } from '@nestjs/common';
import { UserRepository } from '../model/repository/user.repository';
import { RegisterDto } from '../model';
import { User } from '../model/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(newUser: RegisterDto): Promise<User> {
    return await this.userRepository.createDocument(newUser);
  }
}
