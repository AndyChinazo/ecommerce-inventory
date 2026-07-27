import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { CreateTransactionDto } from '../dto/create-transaction.dto';

import { PrismaProductRepository } from '../../../products/infrastructure/repositories/prisma-product.repository';
import { PrismaCustomerRepository } from '../../../customers/infrastructure/repositories/prisma-customer.repository';
import { PrismaTransactionRepository } from '../../infrastructure/repositories/prisma-transaction.repository';
import * as crypto from 'crypto';
import { WompiService } from '../../infrastructure/services/wompi.service';

@Injectable()
export class CreateTransactionUseCase {

  constructor(
    private readonly productRepository: PrismaProductRepository,
    private readonly customerRepository: PrismaCustomerRepository,
    private readonly transactionRepository: PrismaTransactionRepository,
    private readonly wompiService: WompiService,
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

    const transactionNumber = `TX-${Date.now()}`;

    const subtotal = product.price;

    const baseFee = 5000;

    const deliveryFee = 12000;

    const total = subtotal + baseFee + deliveryFee;

    const transaction = await this.transactionRepository.create({
      id: '',
      transactionNumber,
      wompiTransactionId: undefined,
      status: 'PENDING',
      subtotal,
      baseFee,
      deliveryFee,
      total,
      customerId: customer.id,
      productId: product.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const wompi = await this.wompiService.getCheckoutData(
      transaction.transactionNumber,
      transaction.total,
    );

    return {
      transaction,
      wompi,
    };
   
  }

}