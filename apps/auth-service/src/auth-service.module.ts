import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { RmqModule } from 'yes/common/rmq/rmq.module';
import { AUTH_SERVICE, TIME_IN, USER_SERVICE } from 'yes/common/constants';
import { ThrottlerModule } from '@nestjs/throttler';
import { GlobalConfigModule } from 'yes/common/config/config.module';

@Module({
  imports: [
    GlobalConfigModule,
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
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
