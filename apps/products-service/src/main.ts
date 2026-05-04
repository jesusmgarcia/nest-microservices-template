import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap', { timestamp: true });

  // Contexto temporal solo para leer configuración
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const natsServers = configService.get<string[]>('natsServers') as string[];
  await appContext.close();

  if (!natsServers) {
    throw new Error('NATS_SERVERS is not defined');
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: natsServers,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  logger.log(
    `Products Microservice running on NATS servers: ${natsServers.join(', ')}`,
  );
}
bootstrap();
