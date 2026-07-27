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
): Promise<CreateTransactionResponse> {

  const response = await api.post<CreateTransactionResponse>("/transactions",data);

  return response.data;

}

export interface CreateTransactionResponse {

    transaction: Transaction;

    wompi: {

        publicKey: string;

        currency: string;

        amountInCents: number;

        reference: string;

        acceptanceToken: string;

        integritySignature: string;

    };

}