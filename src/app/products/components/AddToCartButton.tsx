"use client"

import { ActionTypes, useCartContext } from "@/context/Cart.context"

interface Props {
  itemID: number
}
export default function AddToCartButton({ itemID }: Props) {
  const { state, dispatch } = useCartContext()
  function clicked(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    console.log("button clicked")
    dispatch({ type: ActionTypes.Add, payload: { id: itemID, units: 1 } })
  }
  return (
    <button onClick={clicked} title="Quick add to cart">
      +
    </button>
  )
}
