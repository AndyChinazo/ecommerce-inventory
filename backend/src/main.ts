import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.APP_URL,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('TARS Sport API')
    .setDescription('API para la tienda deportiva TARS Sport')
    .setVersion('1.0')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(' Servidor iniciado');

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(` Server running on port ${port}`);
  console.log(` Swagger available at /api`);

}

bootstrap();