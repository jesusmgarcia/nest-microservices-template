import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from 'libs/common/constants/services';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: NATS_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: configService.get<string[]>('natsServers') as string[],
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NatsModule {}
