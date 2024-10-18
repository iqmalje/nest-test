import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { init } from './db/supabase-connection';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  console.log(join(__dirname, '..', '/src/views'));
  app.useStaticAssets(join(__dirname, '..', '/src/public'));
  app.useStaticAssets(join(__dirname, '..', '/src/views'));
  app.setViewEngine('pug');
  init();
  await app.listen(3000);
}
bootstrap();
