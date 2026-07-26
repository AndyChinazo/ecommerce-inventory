import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {

  create(customer: Customer): Promise<Customer>;

  findById(id: string): Promise<Customer | null>;

  findByEmail(email: string): Promise<Customer | null>;

}