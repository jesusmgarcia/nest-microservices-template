import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [envConfig],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
