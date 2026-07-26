export interface Transaction {
  id: string;
  transactionNumber: string;
  wompiTransactionId?: string;
  status: string;

  subtotal: number;
  baseFee: number;
  deliveryFee: number;
  total: number;

  customerId: string;
  productId: string;

  createdAt: string;
  updatedAt: string;
}