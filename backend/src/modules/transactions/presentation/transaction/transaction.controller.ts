import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { CreateTransactionUseCase } from '../../application/usecases/create-transaction.usecase';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva transacción',
  })
  @ApiBody({
    type: CreateTransactionDto,
  })
  @ApiCreatedResponse({
    description: 'Transacción recibida correctamente.',
  })
  async create(
    @Body() dto: CreateTransactionDto,
  ) {
    return this.createTransactionUseCase.execute(dto);
  }
}