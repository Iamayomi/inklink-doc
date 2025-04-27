import { Module } from '@nestjs/common';
import { UserServiceController } from './controller';
import { UserService } from './service/user-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/schemas/user.schema';
import { DatabaseModule } from 'yes/common';
import { GlobalConfigModule } from 'yes/common/config/config.module';
import { UserRepository } from './model/repository/user.repository';

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserServiceController],
  providers: [UserService, UserRepository],
})
export class UserServiceModule {}
