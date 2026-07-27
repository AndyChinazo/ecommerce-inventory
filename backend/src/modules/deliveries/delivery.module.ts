import { Module } from '@nestjs/common';

import { PrismaDeliveryRepository } from './domain/repositories/prisma-delivery.repository';

@Module({
  providers: [
    PrismaDeliveryRepository,
  ],
  exports: [
    PrismaDeliveryRepository,
  ],
})
export class DeliveryModule {}