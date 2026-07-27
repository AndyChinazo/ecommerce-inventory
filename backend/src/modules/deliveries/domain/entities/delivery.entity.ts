import { DeliveryStatus } from '@prisma/client';

export class Delivery {

  id!: string;

  transactionId!: string;

  customerId!: string;

  address!: string;

  status!: DeliveryStatus;

  estimatedDate!: Date;

  createdAt!: Date;

}