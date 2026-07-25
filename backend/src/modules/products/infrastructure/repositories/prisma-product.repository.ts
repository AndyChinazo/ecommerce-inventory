import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class PrismaProductRepository implements ProductRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.product.findMany({
      where: {
        active: true,
      },
    });
  }
}