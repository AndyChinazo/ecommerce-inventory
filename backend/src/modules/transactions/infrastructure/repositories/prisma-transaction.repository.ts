import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(transaction: Transaction): Promise<Transaction> {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        transactionNumber: transaction.transactionNumber,
        wompiTransactionId: transaction.wompiTransactionId,
        status: transaction.status as any,
        subtotal: transaction.subtotal,
        baseFee: transaction.baseFee,
        deliveryFee: transaction.deliveryFee,
        total: transaction.total,
        customerId: transaction.customerId,
        productId: transaction.productId,
      },
    });

    return {
      id: createdTransaction.id,
      transactionNumber: createdTransaction.transactionNumber,
      wompiTransactionId: createdTransaction.wompiTransactionId ?? undefined,
      status: createdTransaction.status,
      subtotal: Number(createdTransaction.subtotal),
      baseFee: Number(createdTransaction.baseFee),
      deliveryFee: Number(createdTransaction.deliveryFee),
      total: Number(createdTransaction.total),
      customerId: createdTransaction.customerId,
      productId: createdTransaction.productId,
      createdAt: createdTransaction.createdAt,
      updatedAt: createdTransaction.updatedAt,
    };

  }

  async findById(id: string): Promise<Transaction | null> {
    throw new Error('Method not implemented.');
  }

  async findByTransactionNumber(
    transactionNumber: string,
  ): Promise<Transaction | null> {
    throw new Error('Method not implemented.');
  }

  async update(transaction: Transaction): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

}