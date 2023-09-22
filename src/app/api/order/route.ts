import { createOrder } from "@/utils/create-order"
import { getOrder } from "@/utils/get-order"
import { getLastOrders, getNextOrders, getOrders } from "@/utils/get-orders"
import { NextRequest, NextResponse } from "next/server"

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

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const id = params.get("id")
  const cursor = params.get("cursor")
  const page = params.get("page")
  const sortBy = params.get("sortBy")
  const sortDir = params.get("sortDir")

  if (!id) {
    try {
      let orders
      let sortParams
      let parsedCursor
      if (sortBy && sortDir) {
        sortParams = { [sortBy]: sortDir as "asc" | "desc" }
      }
      if (cursor) {
        parsedCursor = parseInt(cursor)
      }
      if (page === "next") {
        orders = await getNextOrders(parsedCursor, sortParams)
      } else if (page === "last") {
        orders = await getLastOrders(parsedCursor, sortParams)
      } else {
        orders = await getOrders(sortParams)
      }
      return NextResponse.json(orders)
    } catch (error) {
      return NextResponse.json(
        { message: (error as unknown as Error).message },
        { status: 400 }
      )
    }
  } else {
    try {
      const order = await getOrder(Number(id))
      return NextResponse.json(order)
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: (error as unknown as Error).message },
        { status: 400 }
      )
    }
  }
}
