import { Controller, Get , Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiParam, ApiNotFoundResponse} from '@nestjs/swagger';
import { ProductResponseDto } from '../../application/dto/product-response.dto';
import { GetProductsUseCase } from '../../application/usecases/get-products.usecase';
import { GetProductByIdUseCase } from '../../application/usecases/get-product-by-id.usecase';

@ApiTags('Products')
@Controller('products')
export class ProductController {

  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

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

   @Get(':id')
  @ApiOperation({
    summary: 'Obtener un producto por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del producto',
  })
  @ApiOkResponse({
    description: 'Producto encontrado.',
    type: ProductResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Producto no encontrado.',
  })
  async findById(
    @Param('id') id: string,
  ) {
    return this.getProductByIdUseCase.execute(id);
  }

}