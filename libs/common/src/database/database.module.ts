import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MONGO_URL } from '../constants';
import { GlobalConfigModule } from '../config/config.module';

@Module({
  imports: [
    GlobalConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(MONGO_URL),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
