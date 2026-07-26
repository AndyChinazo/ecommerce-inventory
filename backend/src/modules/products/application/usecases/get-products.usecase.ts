import { Injectable } from '@nestjs/common';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { ProductResponseDto } from '../dto/product-response.dto';

@Injectable()
export class GetProductsUseCase {

  constructor(
    private readonly repository: PrismaProductRepository,
  ) { }

  async execute(): Promise<ProductResponseDto[]> {

    const products = await this.repository.findAll();

    return products.map(product => ({

      id: product.id,
      inventoryCode: product.inventoryCode,
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      sizes: product.sizes,
      imageUrl: product.imageUrl,

    }));

  }

}