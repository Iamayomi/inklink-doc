import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { RmqService } from 'yes/common';
import { AUTH_SERVICE, USER_SERVICE } from 'yes/common/constants';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);

  app.setGlobalPrefix('/api/v1/');

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions(AUTH_SERVICE));
  app.startAllMicroservices();

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //   }),
  // );
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
