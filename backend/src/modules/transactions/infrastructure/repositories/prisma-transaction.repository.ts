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

    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      return null;
    }

    return {
      id: transaction.id,
      transactionNumber: transaction.transactionNumber,
      wompiTransactionId: transaction.wompiTransactionId ?? undefined,
      status: transaction.status,
      subtotal: Number(transaction.subtotal),
      baseFee: Number(transaction.baseFee),
      deliveryFee: Number(transaction.deliveryFee),
      total: Number(transaction.total),
      customerId: transaction.customerId,
      productId: transaction.productId,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };

  }

  async findByTransactionNumber(
    transactionNumber: string,
  ): Promise<Transaction | null> {

    const transaction = await this.prisma.transaction.findUnique({
      where: {
        transactionNumber,
      },
    });

    if (!transaction) {
      return null;
    }

    return {
      id: transaction.id,
      transactionNumber: transaction.transactionNumber,
      wompiTransactionId: transaction.wompiTransactionId ?? undefined,
      status: transaction.status,
      subtotal: Number(transaction.subtotal),
      baseFee: Number(transaction.baseFee),
      deliveryFee: Number(transaction.deliveryFee),
      total: Number(transaction.total),
      customerId: transaction.customerId,
      productId: transaction.productId,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };

  }

  async update(transaction: Transaction): Promise<Transaction> {

    const updated = await this.prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
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
      id: updated.id,
      transactionNumber: updated.transactionNumber,
      wompiTransactionId: updated.wompiTransactionId ?? undefined,
      status: updated.status,
      subtotal: Number(updated.subtotal),
      baseFee: Number(updated.baseFee),
      deliveryFee: Number(updated.deliveryFee),
      total: Number(updated.total),
      customerId: updated.customerId,
      productId: updated.productId,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };

  }

}