import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class PrismaProductRepository implements ProductRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findAll(): Promise<Product[]> {

    const products = await this.prisma.product.findMany({
      where: {
        active: true,
      },
    });

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

  async findById(id: string): Promise<Product | null> {

    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    return {
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
    };

  }

  async update(product: Product): Promise<Product> {

    const updated = await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        inventoryCode: product.inventoryCode,
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        price: product.price,
        stock: product.stock,
        sizes: product.sizes,
        imageUrl: product.imageUrl,
      },
    });

    return {
      id: updated.id,
      inventoryCode: updated.inventoryCode,
      name: updated.name,
      brand: updated.brand,
      category: updated.category,
      description: updated.description,
      price: Number(updated.price),
      stock: updated.stock,
      sizes: updated.sizes,
      imageUrl: updated.imageUrl,
    };

  }

}