import { getProduct } from "@/utils/get-product"

export default async function Page({ params }: { params: { id: string } }) {
  let product = await getProduct(parseInt(params.id))
  if (!product) return <div>Product not found</div>
  return <div>Product: {JSON.stringify(product)}</div>
}