import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core/nest-factory';
import {AppModule} from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // autorise Vite
    credentials: true,
  });

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // permet à class-transformer de fonctionner
      }),
  );
  await app.listen(3000);
}
bootstrap();
