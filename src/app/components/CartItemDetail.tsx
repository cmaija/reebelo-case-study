"use client"
import { ActionTypes, Item, useCartContext } from "@/context/Cart.context"
import { Cross1Icon } from "@radix-ui/react-icons"
import ItemCountSelector from "./ItemCountSelector"
import { useEffect, useState } from "react"
import { Product } from "@/lib/interfaces"

interface Props {
  item: Item
}
export function CartItemDetail({ item }: Props) {
  const { dispatch } = useCartContext()

  function handleRemoveFromCart() {
    dispatch({ type: ActionTypes.DeleteItem, payload: item.product })
  }

  const [product, setProduct] = useState<Product>()
  useEffect(() => {
    setProduct(item.product)
  }, [item])

  return (
    <div className="w-full px-2 flex flex-row justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{product?.title}</h3>
        <p className="text-slate-500">{product?.description}</p>
      </div>
      <div className="flex flex-row gap-2">
        <ItemCountSelector item={item} />
        <button title="Remove from cart" onClick={handleRemoveFromCart}>
          <Cross1Icon />
        </button>
      </div>
    </div>
  )
}
