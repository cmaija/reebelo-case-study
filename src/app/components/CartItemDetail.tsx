"use client"
import { ActionTypes, Item, useCartContext } from "@/context/Cart.context"
import { Cross1Icon } from "@radix-ui/react-icons"
import ItemCountSelector from "./ItemCountSelector"
import { useEffect, useState } from "react"
import { Product } from "@/lib/interfaces"
import { OrderProductItem } from "../admin/orders/EditOrderProductsModal"

interface Props {
  item: Item | OrderProductItem
  onDeleteItem?: (item: OrderProductItem) => void
  onChangeItem?: (item: OrderProductItem) => void
}
export function CartItemDetail({ item, onChangeItem, onDeleteItem }: Props) {
  const { dispatch } = useCartContext()

  function handleRemoveFromCart() {
    if (onDeleteItem && "orderProductId" in item) {
      onDeleteItem(item)
    } else {
      dispatch({ type: ActionTypes.DeleteItem, payload: item.product })
    }
  }

  const [product, setProduct] = useState<Product>()
  const [currentItem, setCurrentItem] = useState<Item | OrderProductItem>()
  useEffect(() => {
    setProduct(item.product)
  }, [item])

  useEffect(() => {
    setCurrentItem(item)
  }, [item])

  return (
    <div className="w-full px-2 flex flex-row justify-between items-center">
      <div>
        <h3 className="font-semibold">{product?.title}</h3>
        <p className="text-slate-500">{product?.description}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          {currentItem && (
            <ItemCountSelector onChangeItem={onChangeItem} item={currentItem} />
          )}
          <button title="Remove from cart" onClick={handleRemoveFromCart}>
            <Cross1Icon />
          </button>
        </div>
        <div>
          <span className="text-xl font-semibold">
            ${product?.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
