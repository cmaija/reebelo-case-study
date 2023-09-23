import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog"
import { useEffect, useRef, useState } from "react"
import { Product } from "@/lib/interfaces"
import { Item } from "@/context/Cart.context"
import { CartItemDetail } from "@/app/components/CartItemDetail"
import { Button } from "@/components/ui/button"

interface Props {
  id: number
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess: () => void
}
interface OrderProduct {
  createdAt: string
  id: number
  product: Product
  productCount: number
}

export type OrderProductItem = Item & { orderProductId: number }

function generateItems(products: OrderProduct[]): OrderProductItem[] {
  return products.map((product) => ({
    product: product.product,
    units: product.productCount,
    orderProductId: product.id,
  }))
}

function generateProductsDifference(
  oldItems: OrderProductItem[],
  items: OrderProductItem[]
): (OrderProductItem & { unitsDifference: number })[] {
  function getOldItemUnitsById(id: number): number {
    let oldItem =
      oldItems.find((oldItem) => oldItem.orderProductId === id)?.units || 0
    return oldItem
  }
  let newItems = items.map((item) => {
    return {
      ...item,
      unitsDifference:
        getOldItemUnitsById(item.orderProductId) - item.units || 0,
    }
  })

  return newItems
}
export default function EditOrderProductsModal({
  id,
  open,
  setOpen,
  onSuccess,
}: Props) {
  const [items, setItems] = useState<OrderProductItem[]>([])
  const originalItems = useRef<OrderProductItem[]>([])

  useEffect(() => {
    if (id && open) {
      fetch(`/api/order/${id}/products`)
        .then((response) => response.json())
        .then((data) => {
          const items = generateItems(data.products)
          setItems(items)
          originalItems.current = items
        })
    }
  }, [id, open, setItems])

  function handleItemChange(item: OrderProductItem) {
    setItems((prevItems) => {
      let newItems = structuredClone(prevItems)
      let oldItemIdx = newItems.findIndex(
        (oldItem) => oldItem.product.id === item.product.id
      )
      newItems[oldItemIdx] = item
      return newItems
    })
  }

  function handleDeleteItem(item: OrderProductItem) {
    setItems((prevItems) => {
      let newItems = structuredClone(prevItems)
      let oldItemIdx = newItems.findIndex(
        (oldItem) => oldItem.product.id === item.product.id
      )
      newItems[oldItemIdx] = { ...item, units: 0 }
      return newItems
    })
  }

  function saveProducts() {
    fetch(`/api/order/${id}/products`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: generateProductsDifference(originalItems.current, items),
      }),
    }).then(() => onSuccess())
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild />
      <DialogContent
        onInteractOutside={(event) => {
          event.preventDefault()
        }}
        className="max-h-[80vh] overflow-auto"
      >
        <DialogHeader>
          <h2 className="text-xl font-semibold">Products in Order #{id}</h2>
        </DialogHeader>
        <div>
          {Object.values(items)
            .filter((item) => item.units > 0)
            .map((item: Item) => (
              <CartItemDetail
                onChangeItem={handleItemChange}
                onDeleteItem={handleDeleteItem}
                key={item.product.id}
                item={item}
              />
            ))}
        </div>
        <DialogFooter>
          <Button onClick={saveProducts}> Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
