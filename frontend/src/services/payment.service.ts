import api from "./api";

export interface ProcessPaymentRequest {

  transactionId: string;

  cardNumber: string;

  cvc: string;

  expMonth: string;

  expYear: string;

  cardHolder: string;

  installments: number;

}

export interface ProcessPaymentResponse {

  transactionId: string;

  wompiTransactionId: string;

  status: string;

}

export async function processPayment(
  data: ProcessPaymentRequest
): Promise<ProcessPaymentResponse> {

  const response = await api.post<ProcessPaymentResponse>(
    "/payments",
    data
  );

  return response.data;

}