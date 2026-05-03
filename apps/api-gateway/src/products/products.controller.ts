import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'libs/common/constants/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'libs/common/dtos/pagination.dto';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.natsClient.send('product.create', createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send('product.findAll', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.natsClient.send('product.findOne', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.natsClient
      .send('product.update', { id, ...updateProductDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.natsClient.send('product.remove', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
