import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = WinstonModule.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        utilities.format.nestLike('BookStore', {
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});

const config = new DocumentBuilder()
  .setTitle('Book Store')
  .setDescription('The Book Store API')
  .setVersion('1.0')
  .addTag('books')
  .build();

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
