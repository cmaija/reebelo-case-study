import { createOrder } from "@/utils/create-order"
import { getOrders } from "@/utils/get-orders"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get("id")
  const skip = params.get("skip")
  const take = params.get("take")
  const sortBy = params.get("sortBy")
  const sortDir = params.get("sortDir")

  try {
    let orders
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
    orders = await getOrders(parsedTake, parsedSkip, sortParams)
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { message: (error as unknown as Error).message },
      { status: 400 }
    )
  }
}
export async function POST(req: Request) {
  const order = await req.json()
  if (Object.values(order).length) {
    try {
      const res = await createOrder(order)
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
      { error: "no order details provided" },
      { status: 400 }
    )
  }
}
