import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard/ProductCard";

import type { Product } from "../types/product";

import { getProducts } from "../services/product.service";

import { useAppDispatch } from "../store/hooks";

import CheckoutModal from "../components/Modal/CheckoutModal";

import {

    setSelectedProduct,

    openModal

} from "../store/slices/checkoutSlice";

function Home() {

    const dispatch = useAppDispatch();

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleBuy(product: Product) {
        dispatch(setSelectedProduct(product));

        dispatch(openModal());
    }

    return (
        <main className="min-h-screen bg-gray-100">

            <header className="bg-gradient-to-r from-slate-900 to-black">

                <div className="max-w-screen-2xl mx-auto px-6 py-12">

                    <h1 className="text-5xl font-black text-white">
                        TAR'S SPORT
                    </h1>

                    <p className="text-gray-300 mt-3 text-xl">
                        Equipamiento deportivo profesional
                    </p>

                </div>

            </header>

            <section className="mx-auto w-full max-w-[1600px] px-6 py-8">

                <div
                    className="
                    grid
                    justify-center
                    gap-6
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    2xl:grid-cols-5
                    "
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onBuy={handleBuy}
                        />
                    ))}
                </div>

            </section>

            <CheckoutModal />

        </main>
    );
}

export default Home;