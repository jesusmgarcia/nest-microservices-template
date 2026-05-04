import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get(ConfigService);
  const gatewayPort = configService.get<number>('gatewayPort') as number;
  const natsServers = configService.get<string[]>('natsServers') as string[];

  await app.listen(gatewayPort);
  logger.log(
    `Gateway is running on port ${gatewayPort} with NATS servers: ${natsServers.join(', ')}`,
  );
}
bootstrap();
