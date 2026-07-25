import { Injectable } from '@nestjs/common';
import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';

@Injectable()
export class GetProductsUseCase {

  constructor(
    private readonly repository: PrismaProductRepository,
  ) {}

  async execute() {
    return this.repository.findAll();
  }
}