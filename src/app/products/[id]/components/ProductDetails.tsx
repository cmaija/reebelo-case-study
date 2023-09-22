"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ActionTypes, useCartContext } from "@/context/Cart.context"
import { Product } from "@/lib/interfaces"
import { useMemo, useState } from "react"

interface Props {
  product: Product
}
export default function ProductDetails({ product }: Props) {
  const [itemsCount, setItemsCount] = useState(1)
  const { dispatch } = useCartContext()
  const optsCount = useMemo(() => {
    return [
      ...Array(
        Math.min(
          Math.ceil((itemsCount + 2) / 10) * 10,
          product.unitsInStock + 1
        )
      ),
    ]
  }, [itemsCount])

  function handleUpdateItemCount(event: React.ChangeEvent<HTMLSelectElement>) {
    const newCount = parseInt(event.target.value)
    setItemsCount(newCount)
  }

  function handleAddToCart() {
    dispatch({ type: ActionTypes.Add, payload: { product, units: itemsCount } })
  }

  return (
    <Card className="flex flex-col w-full">
      <CardContent>
        <CardHeader>
          <h2 className="text-4xl font-bold">{product.title}</h2>
          <p className="text-slate-500">{product.description}</p>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-3xl mb-4">${product.price.toFixed(2)}</p>
          <div className="flex flex-row w-full items-center justify-stretch gap-3">
            <Button className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <label className="flex-1" htmlFor={`${product.id}-count`}>
              <select
                id={`${product.id}-count`}
                value={itemsCount}
                onChange={handleUpdateItemCount}
                className="w-full"
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
          </div>
        </CardContent>
      </CardContent>
    </Card>
  )
}
