import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProcessPaymentUseCase } from '../application/use-cases/process-payment.use-case';

@Controller('payments')
export class PaymentController {

    constructor(
        private readonly processPaymentUseCase: ProcessPaymentUseCase,
    ) {}

    @Post()
    async processPayment(
        @Body() dto: CreatePaymentDto,
    ) {
        return this.processPaymentUseCase.execute(dto);
    }

}