import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    throw new Error('Method not implemented.');
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