import { deleteOrder } from "@/utils/delete-order"
import { getOrder } from "@/utils/get-order"
import { updateOrder } from "@/utils/update-order"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
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

export async function PATCH(req: Request) {
  const order = await req.json()
  if (Object.values(order).length && order.id) {
    try {
      const res = await updateOrder(order)
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  try {
    const res = await deleteOrder(parseInt(id))
    return NextResponse.json(res)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: (error as unknown as Error).message },
      { status: 400 }
    )
  }
}
