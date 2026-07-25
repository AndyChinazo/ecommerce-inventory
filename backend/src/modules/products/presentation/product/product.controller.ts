import { Controller, Get } from '@nestjs/common';
import { GetProductsUseCase } from '../../application/usecases/get-products.usecase';

@Controller('products')
export class ProductController {

  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
  ) {}

  @Get()
  async findAll() {
    return this.getProductsUseCase.execute();
  }

}