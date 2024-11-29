import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Enable validation globally
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Automatically remove fields not defined in the DTO
        forbidNonWhitelisted: true, // Throw error for unknown fields
        transform: true, // Transform request payloads into DTO instances
      }),
    );

    app.enableCors({
      origin: '*',
      methods: 'GET, POST',
      allowedHeaders: 'Content-Type',
    });
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/upload',
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (err) {
    console.error('Error during application bootstrap', err);
  }
}

bootstrap();
