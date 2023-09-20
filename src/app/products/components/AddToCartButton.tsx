"use client"

import { ActionTypes, useCartContext } from "@/context/Cart.context"
import { Product } from "@prisma/client"

export default function AddToCartButton({ product }: { product: Product }) {
  const { state, dispatch } = useCartContext()
  function clicked() {
    dispatch({ type: ActionTypes.Add, payload: { id: product.id, units: 1 } })
  }
  return (
    <button onClick={clicked} title="Quick add to cart">
      +
    </button>
  )
}
