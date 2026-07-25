import { Module } from '@nestjs/common';
import { ProductController } from './presentation/product/product.controller';
import { GetProductsUseCase } from './application/usecases/get-products.usecase';
import { PrismaProductRepository } from './infrastructure/repositories/prisma-product.repository';

@Module({
  controllers: [ProductController],
  providers: [GetProductsUseCase,PrismaProductRepository,]
})
export class ProductsModule {}
