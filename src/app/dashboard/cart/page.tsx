import { cookies } from "next/headers";
import { ItemCard } from "@/shoping-cart";
import { WidgetItem } from "@/components";
import { products, type Product } from "@/data/products";

export const metadata = {
    title: 'Carrito de compras',
    description: 'Carrito de compras',
};

//? interface para 

interface ProductInCart {
    product: Product;
    quantity: number;
}

//? funcion para obtener el prodcuto y la cantidad que existe en el carrito decompra como arreglo y despues iterar
const getProductInCart = (cart: { [id: string]: number }): ProductInCart[] => {
    //? inicializo la variable y la tipamos
    const productInCart: ProductInCart[] = [];
    //? iteracion que va de acuerdo a cada propiedad del objeto de cookies
    //? id que tomara el valor de cada las claves que existan
    for (const id of Object.keys(cart)) {
        //? encontramos el producto que sea de igual id del producto que se desea
        const product = products.find(prod => prod.id === id)
        //? si existe entonces lo enpujamos al arreglo de productInCart como un objeto de 
        if (product) {
            productInCart.push({ product, quantity: cart[id] });
        }
    }
    return productInCart;
}

export default async function CartPage() {

    const cookiesStore = await cookies();
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}');
    const productsInCard = getProductInCart(cart);

    //? funcion reduce para calcular el iva apartir de la cantida de productos y el precio
    const totalPagar = productsInCard.reduce((prev, current) =>
        (current.product.price * current.quantity) + prev, 0);

    return (
        <div>
            <h1 className="text-3xl">Card Page</h1>
            <hr className="my-2 " />

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {
                        productsInCard.map(({ product, quantity }) =>
                            (<ItemCard key={product.id} product={product} quantity={quantity} />)
                        )
                    }
                </div>
                <div className="flex flex-col sm:w4/12">
                    <WidgetItem title="Total a pagar">
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="text-3xl font-bold text-gray-700">${(totalPagar * 1.15).toFixed(2)}</h3>
                            <span className="block text-center text-gray-500">{(totalPagar * 0.15).toFixed(2)}</span>
                            <div className="text-green-500 flex flex-row items-center justify-center gap-2">
                                <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                                </svg>
                                <span>Aplicado 15% de IVA</span>
                            </div>
                        </div>
                    </WidgetItem>

                </div>
            </div>
        </div>
    );
}