import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //create swagger
  const config = new DocumentBuilder()
    .setTitle(`neovam`)
    .setDescription(`The neovam API's`)
    .setVersion(`1.0.0`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`swagger-api`, app, document);

  //attach pip validaton's
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
