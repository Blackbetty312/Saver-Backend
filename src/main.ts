import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, preflightContinue: false, credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}

bootstrap();
