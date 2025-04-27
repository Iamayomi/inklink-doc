import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  app.setGlobalPrefix('/api/v1/');

  await app.listen(8000);
}
bootstrap();
