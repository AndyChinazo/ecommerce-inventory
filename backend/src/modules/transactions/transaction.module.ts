import { Module } from '@nestjs/common';

import { TransactionController } from './presentation/transaction/transaction.controller';
import { CreateTransactionUseCase } from './application/usecases/create-transaction.usecase';
import { PrismaTransactionRepository } from './infrastructure/repositories/prisma-transaction.repository';

@Module({
  controllers: [TransactionController],
  providers: [    CreateTransactionUseCase, PrismaTransactionRepository,],
})
export class TransactionModule {}