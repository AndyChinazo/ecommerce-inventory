import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(customer: Customer): Promise<Customer> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Customer | null> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<Customer | null> {
    throw new Error('Method not implemented.');
  }

}