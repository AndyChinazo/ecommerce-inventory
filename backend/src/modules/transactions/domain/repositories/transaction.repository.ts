import { Transaction } from '../entities/transaction.entity';

export interface TransactionRepository {

  create(transaction: Transaction): Promise<Transaction>;

  findById(id: string): Promise<Transaction | null>;

  findByTransactionNumber(
    transactionNumber: string,
  ): Promise<Transaction | null>;

  update(transaction: Transaction): Promise<Transaction>;

}