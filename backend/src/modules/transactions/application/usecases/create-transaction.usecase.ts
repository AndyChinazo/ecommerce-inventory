import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {

  async execute(dto: CreateTransactionDto) {

    console.log('Nueva transacción recibida:', dto);

    return {
      message: 'Transacción recibida correctamente.',
      data: dto,
    };

  }

}