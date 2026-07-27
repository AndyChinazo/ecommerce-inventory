import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';

import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(customer: Customer): Promise<Customer> {
    const createdCustomer = await this.prisma.customer.create({
      data: {
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        department: customer.department,
      },
    });

    return {
      id: createdCustomer.id,
      fullName: createdCustomer.fullName,
      email: createdCustomer.email,
      phone: createdCustomer.phone,
      address: createdCustomer.address,
      city: createdCustomer.city,
      department: createdCustomer.department,
      createdAt: createdCustomer.createdAt,
    };
  }

  async findById(id: string): Promise<Customer | null> {

    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      return null;
    }

    return {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      department: customer.department,
      createdAt: customer.createdAt,
    };

  }

  async findByEmail(email: string): Promise<Customer | null> {

    const customer = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!customer) {
      return null;
    }

    return {
      id: customer.id,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      department: customer.department,
      createdAt: customer.createdAt,
    };

  }

}