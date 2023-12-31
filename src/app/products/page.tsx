import { getInStockProducts } from "@/utils/get-products"
import { Product } from "@/lib/interfaces"
import ProductCard from "./components/ProductCard"

export default async function Products() {
  let products: Product[] = await getInStockProducts()
  return (
    <div className="mt-6 mx-auto flex flex-col w-full items-center">
      <div className="max-w-[95%] grid grid-cols-12 gap-x-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
