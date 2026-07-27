import { Module } from '@nestjs/common';

import { PaymentController } from './presentation/payment.controller';

import { ProcessPaymentUseCase } from './application/use-cases/process-payment.use-case';

import { TransactionModule } from '../transactions/transaction.module';
import { ProductsModule } from '../products/products.module';
import { CustomersModule } from '../customers/customers.module';
import { DeliveryModule } from '../deliveries/delivery.module';

@Module({
  imports: [
    TransactionModule,
    ProductsModule,
    CustomersModule,
    DeliveryModule,
  ],
  controllers: [
    PaymentController,
  ],
  providers: [
    ProcessPaymentUseCase,
  ],
})
export class PaymentModule {}