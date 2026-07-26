import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseDto } from '../dto/product-response.dto';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';

@Injectable()
export class GetProductByIdUseCase {

  constructor(
      private readonly repository: PrismaProductRepository,
  ) {}

  async execute(id: string): Promise<ProductResponseDto> {

    const product = await this.repository.findById(id);

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return {
      id: product.id,
      inventoryCode: product.inventoryCode,
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
      sizes: product.sizes,
      imageUrl: product.imageUrl,
    };

  }

}