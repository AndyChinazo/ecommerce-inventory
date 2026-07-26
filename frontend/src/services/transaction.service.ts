import api from "./api";
import type { Transaction } from "../types/transaction";

export interface CreateTransactionRequest {
  productId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
}



export async function createTransaction(
  data: CreateTransactionRequest
): Promise<Transaction> {

  const response = await api.post<Transaction>("/transactions",data);

  return response.data;

}