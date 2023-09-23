import { createProduct } from "@/utils/create-product"
import { getOrderProducts } from "@/utils/get-order"
import { updateOrderProducts } from "@/utils/update-order"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const product = await req.json()
  if (Object.values(product).length) {
    try {
      const res = await createProduct(product)
      return NextResponse.json(res)
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: (error as unknown as Error).message },
        { status: 400 }
      )
    }
  } else {
    return NextResponse.json(
      { error: "no product details provided" },
      { status: 400 }
    )
  }
}

export async function PATCH(req: Request) {
  const { products } = await req.json()
  try {
    const res = await updateOrderProducts(products)
    return NextResponse.json(res)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: (error as unknown as Error).message },
      { status: 400 }
    )
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  if (id) {
    try {
      const res = await getOrderProducts(parseInt(id))
      return NextResponse.json(res)
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: (error as unknown as Error).message },
        { status: 400 }
      )
    }
  } else {
    return NextResponse.json(
      { error: "Please provide an order id" },
      { status: 400 }
    )
  }
}
