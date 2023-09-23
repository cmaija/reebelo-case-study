import { Suspense } from "react"
import ProductsTable from "./ProductsTable"
import { Button } from "@/components/ui/button"
export default async function Products() {
  return (
    <div className="max-w-[1800px] w-4/5 mx-auto pt-6">
      <h1 className="text-3xl font-bold mb-4">Manage Products</h1>
      <Suspense>
        <ProductsTable />
      </Suspense>
    </div>
  )
}
