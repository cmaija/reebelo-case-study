import { ActionTypes, Item, useCartContext } from "@/context/Cart.context"
import { useEffect, useMemo, useState } from "react"

interface Props {
  item: Item
}

export default function ItemCountSelector({ item }: Props) {
  const { state, dispatch } = useCartContext()
  const [itemsCount, setItemsCount] = useState(0)

  useEffect(() => {
    if (state.items[item.product.id]) {
      setItemsCount(state.items[item.product.id].units)
    }
  }, [state])

  const optsCount = useMemo(() => {
    return [...Array(Math.ceil((itemsCount + 2) / 10) * 10)]
  }, [itemsCount])

  function handleUpdateItemCount(event: React.ChangeEvent<HTMLSelectElement>) {
    const newCount = parseInt(event.target.value)
    dispatch({
      type: ActionTypes.UpdateItemCount,
      payload: { ...item, units: newCount },
    })
  }
  return (
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
  )
}
