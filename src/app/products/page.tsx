import { getProducts } from "@/utils/get-products"
import { Product } from "@prisma/client"
import ProductCard from "./components/ProductCard"

export default async function Products() {
  let products: Product[] = await getProducts()
  return (
    <div className="mx-auto flex flex-col w-full items-center">
      <h3>Browse Products</h3>
      <div className="max-w-[95%] grid grid-cols-12 gap-x-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
