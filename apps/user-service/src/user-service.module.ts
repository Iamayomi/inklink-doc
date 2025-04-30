import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { UserServiceController } from './controller';
import { UserService } from './service/user-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/schemas/user.schema';
import { DatabaseModule } from 'yes/common';
import { GlobalConfigModule } from 'yes/common/config/config.module';
// import { UserRepository } from './model/repository/user.repository';
import { TIME_IN, USER_SERVICE } from 'yes/common/constants';
import { RmqModule } from 'yes/common/rmq/rmq.module';

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RmqModule.register({
      name: USER_SERVICE,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: TIME_IN.minutes[1],
        limit: 100,
      },
    ]),
  ],
  controllers: [UserServiceController],
  providers: [UserService],
})
export class UserServiceModule {}
