import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { RmqService } from 'yes/common';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  app.setGlobalPrefix('/api/v1/');

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('USER_SERVICE'));

  app.startAllMicroservices();

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //   }),
  // );
  await app.listen(8000);
}
bootstrap();
