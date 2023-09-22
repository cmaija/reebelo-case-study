import { createOrder } from "@/utils/create-order"
import { NextResponse } from "next/server"

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
