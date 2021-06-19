import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const listenPort = 3000;

const logger = new Logger('main.ts');

/**
 * 主函数
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * 配置Swagger
   */
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt',
    )
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  //允许跨域
  app.enableCors();
  await app.listen(listenPort);
}

bootstrap().then(() => {
  logger.log(`listening in port: ${listenPort}`);
});
