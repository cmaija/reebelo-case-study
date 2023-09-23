import { createProduct } from "@/utils/create-product"
import { getProduct } from "@/utils/get-product"
import { getAllProducts } from "@/utils/get-products"
import { updateProduct } from "@/utils/update-product"
import { NextRequest, NextResponse } from "next/server"

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
  const product = await req.json()
  if (Object.values(product).length && product.id) {
    try {
      const res = await updateProduct(product)
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

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get("id")
  const skip = params.get("skip")
  const take = params.get("take")
  const sortBy = params.get("sortBy")
  const sortDir = params.get("sortDir")

  if (!id) {
    try {
      let products
      let sortParams
      let parsedSkip = 0
      let parsedTake = 10
      if (sortBy && sortDir) {
        sortParams = { [sortBy]: sortDir as "asc" | "desc" }
      }
      if (take !== undefined && take !== null) {
        parsedTake = parseInt(take)
      }
      if (skip) {
        parsedSkip = parseInt(skip)
      }
      products = await getAllProducts(parsedTake, parsedSkip, sortParams)
      return NextResponse.json(products)
    } catch (error) {
      return NextResponse.json(
        { message: (error as unknown as Error).message },
        { status: 400 }
      )
    }
  } else {
    try {
      const product = await getProduct(Number(id))
      return NextResponse.json(product)
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: (error as unknown as Error).message },
        { status: 400 }
      )
    }
  }
}
