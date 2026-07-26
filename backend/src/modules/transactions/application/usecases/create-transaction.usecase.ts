import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { CreateTransactionDto } from '../dto/create-transaction.dto';

import { PrismaProductRepository } from '../../../products/infrastructure/repositories/prisma-product.repository';
import { PrismaCustomerRepository } from '../../../customers/infrastructure/repositories/prisma-customer.repository';


@Injectable()
export class CreateTransactionUseCase {

  constructor(
    private readonly productRepository: PrismaProductRepository,
    private readonly customerRepository: PrismaCustomerRepository,
  ) { }

  async execute(dto: CreateTransactionDto) {

    const product = await this.productRepository.findById(dto.productId);

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (product.stock <= 0) {
      throw new BadRequestException('Producto sin stock');
    }

    let customer = await this.customerRepository.findByEmail(dto.email);

    if (!customer) {

      customer = await this.customerRepository.create({
        id: '',
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        city: dto.city,
        department: dto.department,
        createdAt: new Date(),
      });

    }

    return {
      message: 'Validación completada.',
      product,
      customer,
    };

  }

}