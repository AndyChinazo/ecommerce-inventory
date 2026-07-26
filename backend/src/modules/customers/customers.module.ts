import { Module } from '@nestjs/common';

import { PrismaCustomerRepository } from './infrastructure/repositories/prisma-customer.repository';

@Module({
  providers: [
    PrismaCustomerRepository,
  ],
  exports: [
    PrismaCustomerRepository,
  ],
})
export class CustomersModule {}