import { Injectable, UnprocessableEntityException } from '@nestjs/common';
// import { UserRepository } from '../model/repository/user.repository';
import { RegisterDto } from '../model';
import { User } from '../model/schemas/user.schema';
import { CacheService } from 'yes/common/cache/cache.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ctx, EventPattern, RmqContext } from '@nestjs/microservices';
import { RmqService } from 'yes/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,

    // private readonly cacheService: CacheService,
  ) {}

  async createUser(newUser: RegisterDto): Promise<User> {
    const user = await this.findUserEmail(newUser.email);

    if (user) {
      throw new UnprocessableEntityException('Email has already Exist');
    }

    return await this.userModel.create(newUser);
  }

  async findUserEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async findUserById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
