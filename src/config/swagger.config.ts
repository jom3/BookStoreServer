import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Book Store')
  .setDescription('The Book Store API')
  .setVersion('1.0')
  .addTag('books')
  .build();
