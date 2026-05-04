import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  PRODUCT_CREATE_MESSAGE,
  PRODUCT_FIND_ALL_MESSAGE,
  PRODUCT_FIND_ONE_MESSAGE,
  PRODUCT_UPDATE_MESSAGE,
  PRODUCT_REMOVE_MESSAGE,
} from 'libs/common/constants/products.messages';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(PRODUCT_CREATE_MESSAGE)
  create(@Payload() createProductDto: CreateProductDto) {
    // return this.productsService.create(createProductDto);
    return 'Create product';
  }

  @MessagePattern(PRODUCT_FIND_ALL_MESSAGE)
  findAll() {
    //return this.productsService.findAll();
    return 'Find all products';
  }

  @MessagePattern(PRODUCT_FIND_ONE_MESSAGE)
  findOne(@Payload('id') id: string) {
    //return this.productsService.findOne(id);
    return `Find product with id: ${id}`;
  }

  @MessagePattern(PRODUCT_UPDATE_MESSAGE)
  update(@Payload() updateProductDto: UpdateProductDto) {
    //return this.productsService.update(updateProductDto.id, updateProductDto);
    return `Update product with id: ${updateProductDto.id}`;
  }

  @MessagePattern(PRODUCT_REMOVE_MESSAGE)
  remove(@Payload('id') id: string) {
    //return this.productsService.remove(id);
    return `Remove product with id: ${id}`;
  }
}
