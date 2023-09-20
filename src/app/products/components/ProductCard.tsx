import { Product } from "@prisma/client"
import ProductImage from "./ProductImage"
import AddToCartButton from "./AddToCartButton"

interface Props {
  product: Product
}

export default function ProductCard(props: Props) {
  return (
    <div className="col-span-12 md:col-span-6 mb-8 md:mb-10 lg:col-span-3 sm:col-span-12 lg:mb-11">
      <ProductImage url={props.product.imageUrl} title={props.product.title} />
      <div className="flex flex-row items-center justify-between">
        <div>
          <h3>{props.product.title}</h3>
          <h5>{`$${props.product.price.toFixed(2)}`}</h5>
        </div>
        <div>
          <AddToCartButton product={props.product} />
        </div>
      </div>
    </div>
  )
}
