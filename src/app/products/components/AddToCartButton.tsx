"use client"

import { Button } from "@/components/ui/button"
import { ActionTypes, useCartContext } from "@/context/Cart.context"
import { Product } from "@/lib/interfaces"
import { PlusIcon } from "@radix-ui/react-icons"

interface Props {
  product: Product
}
export default function AddToCartButton({ product }: Props) {
  const { state, dispatch } = useCartContext()
  function clicked(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    dispatch({ type: ActionTypes.Add, payload: { product, units: 1 } })
  }
  return (
    <Button
      size="icon"
      disabled={!product.unitsInStock}
      onClick={clicked}
      title="Quick add to cart"
    >
      <PlusIcon />
    </Button>
  )
}
