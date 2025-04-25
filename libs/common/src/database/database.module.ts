import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MONGO_URL } from '../constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(MONGO_URL),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
