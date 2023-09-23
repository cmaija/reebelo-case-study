import { ActionTypes, Item, useCartContext } from "@/context/Cart.context"
import { useEffect, useMemo, useState } from "react"
import { OrderProductItem } from "../admin/orders/EditOrderProductsModal"

interface Props {
  item: Item | OrderProductItem
  onChangeItem?: (item: OrderProductItem) => void
}

export default function ItemCountSelector({ item, onChangeItem }: Props) {
  const { dispatch } = useCartContext()
  const [itemsCount, setItemsCount] = useState(0)

  useEffect(() => {
    if (item) {
      setItemsCount(item.units)
    }
  }, [item])

  const optsCount = useMemo(() => {
    return [...Array(Math.ceil((itemsCount + 2) / 10) * 10)]
  }, [itemsCount])

  function handleUpdateItemCount(event: React.ChangeEvent<HTMLSelectElement>) {
    const newCount = parseInt(event.target.value)
    if (onChangeItem && "orderProductId" in item) {
      onChangeItem({ ...item, units: newCount })
    } else {
      dispatch({
        type: ActionTypes.UpdateItemCount,
        payload: { ...item, units: newCount },
      })
    }
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
