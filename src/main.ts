import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:63342', 'http://localhost:63342/photo-call-ui/index.html?_ij_reload'],
  });
  await app.listen(3000);
}
bootstrap();
