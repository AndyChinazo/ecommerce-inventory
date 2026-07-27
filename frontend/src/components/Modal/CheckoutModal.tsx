import { useState } from "react";
import { useForm } from "react-hook-form";

import { createTransaction } from "../../services/transaction.service";

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

            const response = await createTransaction({

                productId: product.id,

                fullName: data.fullName,

                email: data.email,

                phone: data.phone,

                address: data.address,

                city: data.city,

                department: data.department,

            });

            dispatch(setTransaction(response.transaction));

            console.log("Transacción creada", response.transaction);

            /*
              Aquí en el siguiente bloque
              conectaremos Wompi.
            */

            const checkout = new window.WidgetCheckout({

                currency: response.wompi.currency,

                amountInCents: response.wompi.amountInCents,

                reference: response.wompi.reference,

                publicKey: response.wompi.publicKey,

                signature: {

                    integrity: response.wompi.integritySignature,

                },

                acceptanceToken: response.wompi.acceptanceToken,

            });
            checkout.open((result: any) => {

                console.log(result);
                //reset();
                //dispatch(closeModal());

            });


        } catch (error) {

            console.error(error);

            setError("No fue posible crear la transacción.");

        } finally {

            setLoading(false);

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

                                    disabled={loading}

                                    className="flex-1 rounded-xl bg-black text-white py-3 hover:bg-gray-800 disabled:opacity-50"

                                >

                                    {

                                        loading

                                            ? "Creando transacción..."

                                            : "Continuar al pago"

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