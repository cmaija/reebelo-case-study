"use client"
import { ActionTypes, Item, useCartContext } from "@/context/Cart.context"
import { useEffect, useMemo, useState } from "react"
import { Cross1Icon } from "@radix-ui/react-icons"

interface Props {
  item: Item
}
export function CartItemDetail({ item }: Props) {
  const { state, dispatch } = useCartContext()
  const [itemsCount, setItemsCount] = useState(0)

  useEffect(() => {
    if (state.items[item.product.id]) {
      setItemsCount(state.items[item.product.id].units)
    }
  }, [state])

  const optsCount = useMemo(() => {
    return [...Array(Math.ceil((itemsCount + 10) / 10) * 10)]
  }, [itemsCount])

  function handleUpdateItemCount(event: React.ChangeEvent<HTMLSelectElement>) {
    const newCount = parseInt(event.target.value)
    dispatch({
      type: ActionTypes.UpdateItemCount,
      payload: { ...item, units: newCount },
    })
  }

  function handleRemoveFromCart() {
    dispatch({ type: ActionTypes.DeleteItem, payload: item.product })
  }

  return (
    <div className="w-full px-2 flex flex-row justify-between items-center">
      <div>
        <h3>{item.product.title}</h3>
        <span>{item.product.description}</span>
      </div>
      <div className="flex flex-row gap-2">
        <label htmlFor={`${item.product.id}-count`}>
          <select
            id={`${item.product.id}-count`}
            value={itemsCount}
            onChange={handleUpdateItemCount}
          >
            {optsCount.map((i, idx) => {
              if (idx !== 0) {
                return (
                  <option value={idx} key={idx}>
                    {idx}
                  </option>
                )
              }
            })}
          </select>
        </label>
        <button title="Remove from cart" onClick={handleRemoveFromCart}>
          <Cross1Icon />
        </button>
      </div>
    </div>
  )
}
