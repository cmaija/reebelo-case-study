import { Product } from "@prisma/client"
import ProductImage from "./ProductImage"
import AddToCartButton from "./AddToCartButton"

interface Props {
  product: Product
}

export default function ProductCard(props: Props) {
  return (
    <div className="md:col-span-6 mb-8 md:mb-10 lg:col-span-3 sm:col-span-12 lg:mb-11">
      <ProductImage url={props.product.imageUrl} title={props.product.title} />
      <div className="flex flex-row items-center">
        <div>
          <h3>{props.product.title}</h3>
          <h5>{`$${props.product.price.toFixed(2)}`}</h5>
        </div>
        <div>
          <AddToCartButton itemID={props.product.id} />
        </div>
      </div>
    </div>
  )
}