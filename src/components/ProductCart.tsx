'use client';
// https://tailwindcomponents.com/component/e-commerce-product-card
import Image from "next/image"
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5"
import { addProductToCart, removeProductToCart } from "@/shoping-cart/actions/actions";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export const ProductCard = ({ id, image, name, price, rating }: Props) => {

  const router = useRouter()
  const onAddToCart = () => {
    addProductToCart(id);
    router.refresh();
  }

  const onRemoveToCart = () => {
    removeProductToCart(id);
    router.refresh()
  }

  return (
    <div className="bg-gray-100 shadow rounded-lg max-w-sm  border-gray-100">

      {/* Product Image */}
      <div className="p-2">
        <Image
          width={500}
          height={500}
          className="rounded"
          src={image}
          alt={name} />
      </div>

      {/* Title */}
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">{name}</h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">



          {
            Array(rating).fill(0).map((i, x) => (
              <svg key={x} className="w-5 h-5 text-yellow-300 border-black" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                </path>
              </svg>
            ))
          }



          {/* Rating Number */}
          <span className="  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200  ml-3">
            {rating.toFixed(2)}
          </span>
        </div>


        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 ">${price.toFixed(2)}</span>

          <div className="flex">
            <button
              onClick={onAddToCart}
              className="text-white mr-2  hover:bg-sky-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-600 ">
              <IoAddCircleOutline size={25} />
            </button>
            <button
              onClick={onRemoveToCart}
              className="text-white  hover:bg-cyan-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-cyan-600 ">
              <IoTrashOutline size={20} />
            </button>
          </div>

        </div>


      </div>
    </div>
  )
}
