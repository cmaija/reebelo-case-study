import { getProduct } from "@/utils/get-product"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

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
