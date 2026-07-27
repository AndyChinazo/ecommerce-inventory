import type { Product } from "../../types/product";

interface Props {
    product: Product;
    onBuy: (product: Product) => void;
}

function ProductCard({ product, onBuy }: Props) {

    return (

        <div
            className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-2
                flex
                flex-col
                max-w-[280px]
                mx-auto
            "
        >

            <div className="bg-gray-100">

                <img
                    src={`VITE_API_URL${product.imageUrl}`}
                    alt={product.name}
                    className="
                        w-full
                        h-72
                        object-contain
                        p-5
                    "
                />

            </div>

            <div className="p-5 flex flex-col flex-1">

                <span className="uppercase text-xs text-gray-500 tracking-widest">

                    {product.category}

                </span>

                <h2 className="text-xl font-bold mt-2">

                    {product.name}

                </h2>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">

                    {product.description}

                </p>

                <div className="mt-5">

                    <span className="text-3xl font-bold text-black">

                        ${product.price.toLocaleString("es-CO")}

                    </span>

                </div>

                <button

                    onClick={() => onBuy(product)}

                    className="
                        mt-6
                        bg-black
                        text-white
                        rounded-xl
                        py-3
                        font-semibold
                        hover:bg-gray-800
                        transition
                    "
                    style={{
                        cursor: "pointer"
                    }}

                >

                    Comprar

                </button>

            </div>

        </div>

    );

}

export default ProductCard;