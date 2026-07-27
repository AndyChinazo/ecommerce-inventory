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

    const created = await this.prisma.delivery.create({
      data: {
        transactionId: delivery.transactionId,
        customerId: delivery.customerId,
        address: delivery.address,
        status: delivery.status,
        estimatedDate: delivery.estimatedDate,
      },
    });

    return {
      id: created.id,
      transactionId: created.transactionId,
      customerId: created.customerId,
      address: created.address,
      status: created.status,
      estimatedDate: created.estimatedDate,
      createdAt: created.createdAt,
    };

  }

  async findByTransactionId(
    transactionId: string,
  ): Promise<Delivery | null> {

    const delivery = await this.prisma.delivery.findUnique({
      where: {
        transactionId,
      },
    });

    if (!delivery) {
      return null;
    }

    return {
      id: delivery.id,
      transactionId: delivery.transactionId,
      customerId: delivery.customerId,
      address: delivery.address,
      status: delivery.status,
      estimatedDate: delivery.estimatedDate,
      createdAt: delivery.createdAt,
    };

  }

}