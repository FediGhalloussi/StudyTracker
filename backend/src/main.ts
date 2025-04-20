import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core/nest-factory';
import {AppModule} from "./app.module";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);
    const url = config.get('FRONTEND_URL') || "http://localhost:5173";
  app.enableCors({
    origin: url, // autorise Vite
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
