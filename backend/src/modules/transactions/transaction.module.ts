import { Module } from '@nestjs/common';

import { ProductsModule } from '../products/products.module';

import { TransactionController } from './presentation/transaction/transaction.controller';
import { CreateTransactionUseCase } from './application/usecases/create-transaction.usecase';
import { PrismaTransactionRepository } from './infrastructure/repositories/prisma-transaction.repository';
import { CustomersModule } from '../customers/customers.module';
import { WompiService } from './infrastructure/services/wompi.service';

@Module({
  imports: [
    ProductsModule,
    CustomersModule,
  ],
  controllers: [TransactionController],
  providers: [
    CreateTransactionUseCase,
    PrismaTransactionRepository,
    WompiService,
  ],
  exports: [
    PrismaTransactionRepository,
    WompiService,
  ],
})
export class TransactionModule {}