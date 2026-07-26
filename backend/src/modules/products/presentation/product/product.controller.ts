import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductResponseDto } from '../../application/dto/product-response.dto';
import { GetProductsUseCase } from '../../application/usecases/get-products.usecase';

@ApiTags('Products')
@Controller('products')
export class ProductController {

  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
  ) { }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los productos',
  })
  @ApiOkResponse({
    description: 'Lista de productos.',
    type: ProductResponseDto,
    isArray: true,
  })
  async findAll() {
    return this.getProductsUseCase.execute();
  }

}