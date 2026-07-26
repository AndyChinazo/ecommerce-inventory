import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { DeliveryRepository } from '../../domain/repositories/delivery.repository';
import { Delivery } from '../../domain/entities/delivery.entity';

@Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(delivery: Delivery): Promise<Delivery> {
    throw new Error('Method not implemented.');
  }

  async findByTransactionId(
    transactionId: string,
  ): Promise<Delivery | null> {
    throw new Error('Method not implemented.');
  }

}