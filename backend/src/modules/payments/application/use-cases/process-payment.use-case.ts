import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';

import { CreatePaymentDto } from '../../presentation/dto/create-payment.dto';

import { PrismaTransactionRepository } from '../../../transactions/infrastructure/repositories/prisma-transaction.repository';
import { PrismaCustomerRepository } from '../../../customers/infrastructure/repositories/prisma-customer.repository';
import { PrismaProductRepository } from '../../../products/infrastructure/repositories/prisma-product.repository';

import { WompiService } from '../../../transactions/infrastructure/services/wompi.service';
import { PrismaDeliveryRepository } from '../../../deliveries/domain/repositories/prisma-delivery.repository';
import { DeliveryStatus } from '@prisma/client';

@Injectable()
export class ProcessPaymentUseCase {

    constructor(
        private readonly transactionRepository: PrismaTransactionRepository,
        private readonly customerRepository: PrismaCustomerRepository,
        private readonly productRepository: PrismaProductRepository,
        private readonly deliveryRepository: PrismaDeliveryRepository,
        private readonly wompiService: WompiService,
    ) { }

    async execute(dto: CreatePaymentDto) {

        const transaction = await this.transactionRepository.findById(
            dto.transactionId,
        );

        if (!transaction) {
            throw new NotFoundException('Transacción no encontrada');
        }

        const customer = await this.customerRepository.findById(
            transaction.customerId,
        );

        if (!customer) {
            throw new NotFoundException('Cliente no encontrado');
        }
        const checkout = await this.wompiService.getCheckoutData(
            transaction.transactionNumber,
            transaction.total,
        );
        const cardToken = await this.wompiService.tokenizeCard(
            dto.cardNumber,
            dto.cvc,
            dto.expMonth,
            dto.expYear,
            dto.cardHolder,
        );
        const paymentSource = await this.wompiService.createPaymentSource(
            cardToken.id,
            customer.email,
            checkout.acceptanceToken,
        );
        const wompiTransaction = await this.wompiService.createTransaction(
            checkout.acceptanceToken,
            checkout.amountInCents,
            checkout.currency,
            customer.email,
            checkout.reference,
            checkout.integritySignature,
            paymentSource.id,
            dto.installments,
        );

        transaction.wompiTransactionId = wompiTransaction.id;
        transaction.status = wompiTransaction.status;
        await this.transactionRepository.update(transaction);

        let status = wompiTransaction.status;
        const maxAttempts = 20;
        let attempts = 0;

        while (status === 'PENDING' && attempts < maxAttempts) {

            await new Promise(resolve => setTimeout(resolve, 3000));

            const response = await this.wompiService.getTransactionStatus(
                wompiTransaction.id,
            );

            status = response.status;

            attempts++;

        }

        transaction.status = status;

        await this.transactionRepository.update(transaction);

        // Si el pago fue aprobado
        if (status === 'APPROVED') {

            const product = await this.productRepository.findById(
                transaction.productId,
            );

            if (!product) {
                throw new NotFoundException('Producto no encontrado');
            }

            if (product.stock <= 0) {
                throw new BadRequestException('Producto sin stock');
            }

            product.stock -= 1;

            await this.productRepository.update(product);

            const estimatedDate = new Date();
            estimatedDate.setDate(estimatedDate.getDate() + 5);
            
            //Si por algún motivo el endpoint se ejecuta dos veces (por ejemplo, el usuario refresca la página o el frontend reintenta la petición), podría intentar crear otra entrega para la misma transacción.
            const existingDelivery =
                await this.deliveryRepository.findByTransactionId(
                    transaction.id,
                );

            if (!existingDelivery) {

                await this.deliveryRepository.create({
                    id: '',
                    transactionId: transaction.id,
                    customerId: customer.id,
                    address: customer.address,
                    status: DeliveryStatus.PENDING,
                    estimatedDate,
                    createdAt: new Date(),
                });

            }
        }

        return {
            transactionId: transaction.id,
            wompiTransactionId: wompiTransaction.id,
            status,
        };



    }

}

