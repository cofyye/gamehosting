import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import * as fileUpload from 'express-fileupload';

import { ClassValidatorFilter } from './shared/filters/class-validator.filter';
import { TrimPipe } from './shared/pipes/trim.pipe';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useBodyParser('json', { limit: '500mb' });
  app.useBodyParser('urlencoded', { limit: '500mb', extended: true });

  app.use(fileUpload());

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new ClassValidatorFilter());

  await app.listen(3000);
}
bootstrap();
