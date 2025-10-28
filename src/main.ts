import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { loggerConfig as logger } from './config/logger.config';
import { swaggerConfig as config } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(
    'info',
    `🟢 Server running on port ${process.env.PORT ?? 3000} 🟢`,
  );
}
void bootstrap();
