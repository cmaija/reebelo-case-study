import { getProduct } from "@/utils/get-product"
import ProductDetails from "./components/ProductDetails"
import ProductImage from "@/app/products/[id]/components/ProductImage"

export default async function Page({ params }: { params: { id: string } }) {
  let product = await getProduct(parseInt(params.id))
  if (!product) return <div>Product not found</div>
  return (
    <div className="mx-auto pt-10 flex flex-col sm:flex-row xl:max-w-[75%] lg:max-w-[66%] sm:max-w-full">
      <div className="flex-grow-[2]">
        <ProductImage product={product} />
      </div>
      <div className="flex-grow-[1]">
        <ProductDetails product={product} />
      </div>
    </div>
  )
}
