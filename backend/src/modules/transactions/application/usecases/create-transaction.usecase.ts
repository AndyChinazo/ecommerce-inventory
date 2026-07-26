import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { CreateTransactionDto } from '../dto/create-transaction.dto';

import { PrismaProductRepository } from '../../../products/infrastructure/repositories/prisma-product.repository';

@Injectable()
export class CreateTransactionUseCase {

  constructor(
    private readonly productRepository: PrismaProductRepository,
  ) {}

  async execute(dto: CreateTransactionDto) {

    const product = await this.productRepository.findById(dto.productId);

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (product.stock <= 0) {
      throw new BadRequestException('Producto sin stock');
    }

    console.log(product);

    return {
      message: 'Producto encontrado.',
      product,
    };

  }

}