import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class WompiService {

    private readonly baseUrl = process.env.WOMPI_BASE_URL!;
    private readonly publicKey = process.env.WOMPI_PUBLIC_KEY!;
    private readonly privateKey = process.env.WOMPI_PRIVATE_KEY!;

    /**
     * Tokeniza una tarjeta
     */
    async tokenizeCard(
        number: string,
        cvc: string,
        expMonth: string,
        expYear: string,
        cardHolder: string,
    ) {

        const { data } = await axios.post(
            `${this.baseUrl}/tokens/cards`,
            {
                number,
                cvc,
                exp_month: expMonth,
                exp_year: expYear,
                card_holder: cardHolder,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.publicKey}`,
                },
            },
        );

        console.log("CARD TOKEN");
        console.log(data.data);

        return data.data;
    }

    /**
     * Crea una fuente de pago
     */
    async createPaymentSource(
        cardToken: string,
        customerEmail: string,
        acceptanceToken: string,
    ) {

        const { data } = await axios.post(
            `${this.baseUrl}/payment_sources`,
            {
                type: 'CARD',
                token: cardToken,
                customer_email: customerEmail,
                acceptance_token: acceptanceToken,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.privateKey}`,
                },
            },
        );

        console.log("PAYMENT SOURCE");
        console.log(data.data);

        return data.data;
    }

    async createTransaction(
        acceptanceToken: string,
        amountInCents: number,
        currency: string,
        customerEmail: string,
        reference: string,
        signature: string,
        paymentSourceId: number,
        installments: number,
    ) {
        try {
            const { data } = await axios.post(
                `${this.baseUrl}/transactions`,
                {
                    acceptance_token: acceptanceToken,
                    amount_in_cents: amountInCents,
                    currency,
                    customer_email: customerEmail,
                    reference,
                    signature,
                    payment_method: {
                        installments,
                    },
                    payment_source_id: paymentSourceId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.privateKey}`,
                    },
                },
            );

            console.log("TRANSACTION");
            console.dir(data.data, { depth: null });

            return data.data;

        } catch (error: any) {

            console.log("=================================");
            console.log("STATUS:", error.response?.status);
            console.log("HEADERS:", error.response?.headers);
            console.log("DATA:");
            console.dir(error.response?.data, { depth: null });
            console.log("=================================");

            throw error;
        }
    }

    async getTransactionStatus(transactionId: string) {

        const { data } = await axios.get(
            `${this.baseUrl}/transactions/${transactionId}`,
            {
                headers: {
                    Authorization: `Bearer ${this.publicKey}`,
                },
            },
        );

        console.log("TRANSACTION STATUS");
        console.dir(data.data, { depth: null });

        return data.data;
    }

    async getCheckoutData(reference: string, total: number) {
        const amountInCents = total * 100;

        const { data } = await axios.get(
            `${this.baseUrl}/merchants/${this.publicKey}`,
        );

        const acceptanceToken =
            data.data.presigned_acceptance.acceptance_token;

        const integritySignature = crypto
            .createHash('sha256')
            .update(
                reference +
                amountInCents +
                'COP' +
                process.env.WOMPI_INTEGRITY_SECRET,
            )
            .digest('hex');

        return {
            publicKey: this.publicKey,
            currency: 'COP',
            amountInCents,
            reference,
            acceptanceToken,
            integritySignature,
        };
    }
}