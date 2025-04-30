import { NestFactory } from '@nestjs/core';
import { DocumentModule } from './document.module';
import { RmqService } from 'yes/common';

async function bootstrap() {
  const app = await NestFactory.create(DocumentModule);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('USER-SERVICE'));
}
bootstrap();
