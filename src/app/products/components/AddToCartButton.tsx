"use client"

import { ActionTypes, useCartContext } from "@/context/Cart.context"
import { Product } from "@prisma/client"

interface Props {
  product: Product
}
export default function AddToCartButton({ product }: Props) {
  const { state, dispatch } = useCartContext()
  function clicked(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    console.log("button clicked")
    dispatch({ type: ActionTypes.Add, payload: { product, units: 1 } })
  }
  return (
    <button onClick={clicked} title="Quick add to cart">
      +
    </button>
  )
}
