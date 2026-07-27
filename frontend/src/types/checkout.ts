export interface CheckoutForm {

  // Cliente
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;

  // Pago
  cardNumber: string;
  cardHolder: string;
  expMonth: string;
  expYear: string;
  cvc: string;
  installments: number;

}