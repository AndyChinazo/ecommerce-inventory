import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
  Max,
} from 'class-validator';

export class CreatePaymentDto {

  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsString()
  @Length(13, 19)
  cardNumber: string;

  @IsString()
  @Length(3, 4)
  cvc: string;

  @IsString()
  @Length(2, 2)
  expMonth: string;

  @IsString()
  @Length(2, 2)
  expYear: string;

  @IsString()
  @IsNotEmpty()
  cardHolder: string;

  @IsInt()
  @Min(1)
  @Max(36)
  installments: number;

}