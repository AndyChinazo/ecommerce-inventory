import { useState } from "react";
import { useForm } from "react-hook-form";

import { createTransaction } from "../../services/transaction.service";
import { processPayment } from "../../services/payment.service";

import type { CheckoutForm } from "../../types/checkout";

import { useAppDispatch, useAppSelector } from "../../store/hooks";


import {
    closeModal,
    setCustomer,
    setTransaction,
} from "../../store/slices/checkoutSlice";

function CheckoutModal() {

    const dispatch = useAppDispatch();

    const {
        selectedProduct,
        isOpen,
    } = useAppSelector(
        state => state.checkout
    );

    const [loading, setLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [error, setError] = useState("");

    const {

        register,

        handleSubmit,

        formState: { errors },

        reset,

    } = useForm<CheckoutForm>();

    if (!isOpen || !selectedProduct) {
        return null;
    }
    const product = selectedProduct;

    async function onSubmit(data: CheckoutForm) {

        try {

            setLoading(true);
            setError("");

            dispatch(setCustomer(data));

            const transactionResponse = await createTransaction({

                productId: product.id,

                fullName: data.fullName,

                email: data.email,

                phone: data.phone,

                address: data.address,

                city: data.city,

                department: data.department,

            });

            dispatch(setTransaction(transactionResponse.transaction));

            setLoading(false);

            setPaymentLoading(true);

            const payment = await processPayment({

                transactionId: transactionResponse.transaction.id,

                cardNumber: data.cardNumber,

                cvc: data.cvc,

                expMonth: data.expMonth,

                expYear: data.expYear,

                cardHolder: data.cardHolder,

                installments: Number(data.installments),

            });

            setPaymentLoading(false);
            setError("");

            switch (payment.status) {

                case "APPROVED":

                    setPaymentSuccess(true);

                    setTimeout(() => {

                        reset();

                        dispatch(closeModal());

                    }, 1800);

                    break;

                case "DECLINED":

                    setError("La entidad financiera rechazó el pago.");
                    break;

                case "VOIDED":

                    setError("La transacción fue cancelada.");
                    break;

                case "ERROR":

                    setError("Ocurrió un error procesando el pago.");
                    break;

                case "PENDING":

                    setError("El pago aún se encuentra pendiente.");
                    break;

                default:

                    setError(`Estado del pago: ${payment.status}`);
                    break;

            }


        } catch (error) {

            console.error(error);

            setLoading(false);

            setPaymentLoading(false);

            setError("No fue posible procesar el pago.");

        }

    }
    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8"
                >

                    <div className="flex items-center justify-between">

                        <h2 className="text-3xl font-bold">

                            Finalizar compra

                        </h2>

                        <button
                            type="button"
                            onClick={() => dispatch(closeModal())}
                            className="text-3xl font-light hover:text-red-500"
                        >
                            ×
                        </button>

                    </div>

                    {
                        error && (

                            <div className="mt-5 rounded-lg bg-red-100 text-red-700 p-4">

                                {error}

                            </div>

                        )
                    }
                    {
                        paymentSuccess && (

                            <div className="mt-5 rounded-lg bg-green-100 text-green-700 p-4">

                                ✅ Pago aprobado correctamente.

                            </div>

                        )
                    }

                    <div className="grid lg:grid-cols-2 gap-10 mt-8">

                        <div>

                            <img
                                src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
                                alt={product.name}
                                className="w-full rounded-xl border"
                            />

                            <h3 className="mt-5 text-2xl font-bold">

                                {product.name}

                            </h3>

                            <p className="text-gray-600 mt-2">

                                {product.description}

                            </p>

                            <p className="text-3xl font-bold text-green-700 mt-5">

                                ${product.price.toLocaleString("es-CO")}

                            </p>

                        </div>

                        <div>

                            <h3 className="text-xl font-semibold mb-5">

                                Información del cliente

                            </h3>

                            <div className="space-y-5">

                                <div>

                                    <label className="font-medium">

                                        Nombre completo

                                    </label>

                                    <input

                                        {...register("fullName", {
                                            required: "Ingrese su nombre"
                                        })}

                                        className="w-full mt-2 border rounded-lg p-3"

                                    />

                                    <p className="text-red-500 text-sm mt-1">

                                        {errors.fullName?.message}

                                    </p>

                                </div>

                                <div>

                                    <label className="font-medium">

                                        Correo electrónico

                                    </label>

                                    <input

                                        type="email"

                                        {...register("email", {
                                            required: "Ingrese un correo"
                                        })}

                                        className="w-full mt-2 border rounded-lg p-3"

                                    />

                                    <p className="text-red-500 text-sm mt-1">

                                        {errors.email?.message}

                                    </p>

                                </div>

                                <div>

                                    <label className="font-medium">

                                        Teléfono

                                    </label>

                                    <input

                                        {...register("phone", {
                                            required: "Ingrese un teléfono"
                                        })}

                                        className="w-full mt-2 border rounded-lg p-3"

                                    />

                                    <p className="text-red-500 text-sm mt-1">

                                        {errors.phone?.message}

                                    </p>

                                </div>

                                <div>

                                    <label className="font-medium">

                                        Dirección

                                    </label>

                                    <input

                                        {...register("address", {
                                            required: "Ingrese una dirección"
                                        })}

                                        className="w-full mt-2 border rounded-lg p-3"

                                    />

                                    <p className="text-red-500 text-sm mt-1">

                                        {errors.address?.message}

                                    </p>

                                </div>

                                <div className="grid md:grid-cols-2 gap-4">

                                    <div>

                                        <label className="font-medium">

                                            Ciudad

                                        </label>

                                        <input

                                            {...register("city", {
                                                required: "Ingrese una ciudad"
                                            })}

                                            className="w-full mt-2 border rounded-lg p-3"

                                        />

                                        <p className="text-red-500 text-sm mt-1">

                                            {errors.city?.message}

                                        </p>

                                    </div>

                                    <div>

                                        <label className="font-medium">

                                            Departamento

                                        </label>

                                        <input

                                            {...register("department", {
                                                required: "Ingrese un departamento"
                                            })}

                                            className="w-full mt-2 border rounded-lg p-3"

                                        />

                                        <p className="text-red-500 text-sm mt-1">

                                            {errors.department?.message}

                                        </p>

                                    </div>

                                </div>
                            </div>
                            <div>

                                <label className="font-medium">

                                    Número de tarjeta

                                </label>

                                <input
                                    {...register("cardNumber", {
                                        required: "Ingrese el número de la tarjeta",
                                        minLength: {
                                            value: 13,
                                            message: "Número de tarjeta inválido",
                                        },
                                    })}
                                    placeholder="4242 4242 4242 4242"
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                                <p className="text-red-500 text-sm mt-1">

                                    {errors.cardNumber?.message}

                                </p>

                            </div>
                            <div>

                                <label className="font-medium">

                                    Titular de la tarjeta

                                </label>

                                <input
                                    {...register("cardHolder", {
                                        required: "Ingrese el titular",
                                    })}
                                    className="w-full mt-2 border rounded-lg p-3"
                                />

                                <p className="text-red-500 text-sm mt-1">

                                    {errors.cardHolder?.message}

                                </p>

                            </div>
                            <div className="grid grid-cols-3 gap-4">

                                <div>

                                    <label className="font-medium">

                                        Mes

                                    </label>

                                    <input
                                        {...register("expMonth", {
                                            required: "Mes",
                                        })}
                                        placeholder="MM"
                                        className="w-full mt-2 border rounded-lg p-3"
                                    />

                                    <p className="text-red-500 text-sm">

                                        {errors.expMonth?.message}

                                    </p>

                                </div>

                                <div>

                                    <label className="font-medium">

                                        Año

                                    </label>

                                    <input
                                        {...register("expYear", {
                                            required: "Año",
                                        })}
                                        placeholder="YY"
                                        className="w-full mt-2 border rounded-lg p-3"
                                    />

                                    <p className="text-red-500 text-sm">

                                        {errors.expYear?.message}

                                    </p>

                                </div>

                                <div>

                                    <label className="font-medium">

                                        CVC

                                    </label>

                                    <input
                                        {...register("cvc", {
                                            required: "CVC",
                                        })}
                                        placeholder="123"
                                        className="w-full mt-2 border rounded-lg p-3"
                                    />

                                    <p className="text-red-500 text-sm">

                                        {errors.cvc?.message}

                                    </p>

                                </div>

                            </div>
                            <div>

                                <label className="font-medium">

                                    Cuotas

                                </label>

                                <select
                                    {...register("installments", {
                                        valueAsNumber: true,
                                    })}
                                    className="w-full mt-2 border rounded-lg p-3"
                                >

                                    {Array.from({ length: 12 }, (_, i) => (

                                        <option
                                            key={i + 1}
                                            value={i + 1}
                                        >

                                            {i + 1}

                                        </option>

                                    ))}

                                </select>

                            </div>


                            <div className="mt-8 rounded-xl border bg-gray-50 p-5">

                                <h3 className="text-xl font-semibold mb-4">

                                    Resumen del pedido

                                </h3>

                                <div className="flex justify-between py-2">

                                    <span>Subtotal</span>

                                    <span>

                                        ${product.price.toLocaleString("es-CO")}

                                    </span>

                                </div>

                                <div className="flex justify-between py-2">

                                    <span>Comisión</span>

                                    <span>

                                        $5.000

                                    </span>

                                </div>

                                <div className="flex justify-between py-2">

                                    <span>Envío</span>

                                    <span>

                                        $12.000

                                    </span>

                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between text-xl font-bold">

                                    <span>Total</span>

                                    <span>

                                        ${(product.price + 5000 + 12000).toLocaleString("es-CO")}

                                    </span>

                                </div>

                            </div>

                            <div className="mt-8 flex gap-4">

                                <button

                                    type="button"

                                    onClick={() => dispatch(closeModal())}

                                    className="flex-1 rounded-xl border border-gray-300 py-3 hover:bg-gray-100"

                                >

                                    Cancelar

                                </button>

                                <button

                                    type="submit"

                                    disabled={loading || paymentLoading}

                                    className="flex-1 rounded-xl bg-black text-white py-3 hover:bg-gray-800 disabled:opacity-50"

                                >

                                    {

                                        loading
                                            ? "Creando transacción..."
                                            : paymentLoading
                                                ? "Procesando pago..."
                                                : "Pagar ahora"

                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CheckoutModal;