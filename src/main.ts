import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

function assertDotEnvExist() {
  const filePath = path.join(__dirname, '../.env');

  const exist = fs.existsSync(path.join(filePath));
  if (!exist) {
    throw new Error('Please create .env file in root directory');
  }
}

async function bootstrap() {
  assertDotEnvExist();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Roulette Game API')
    .setDescription('API for Roulette Game')
    .setVersion('1.0')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token' // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
