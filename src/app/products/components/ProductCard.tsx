import { Product } from "@/lib/interfaces"
import ProductImage from "./ProductImage"
import AddToCartButton from "./AddToCartButton"
import Link from "next/link"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="col-span-12 md:col-span-6 mb-8 md:mb-10 lg:col-span-3 sm:col-span-12 lg:mb-11 text-black">
      <ProductImage
        url={product.imageUrl}
        title={product.title}
        id={product.id}
      />
      <div className="flex flex-row items-center justify-between text-black">
        <Link href={`products/${product.id}`}>
          <h3>{product.title}</h3>
          <h5>{`$${product.price.toFixed(2)}`}</h5>
        </Link>
        <div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
