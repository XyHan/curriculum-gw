import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestIdMiddleware } from './infrastructure/logger/logger-http/request-id/requestid.middleware';
import { LoggerHttpService } from './infrastructure/logger/logger-http/logger-http.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(app.get(RequestIdMiddleware).getMiddleWare());
  app.use(app.get(LoggerHttpService).getMiddleWare());
  await app.listen(3000);
}
bootstrap();
