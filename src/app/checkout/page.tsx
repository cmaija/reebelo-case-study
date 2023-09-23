"use client"

import { ActionTypes, Item, useCartContext } from "@/context/Cart.context"
import { CartItemDetail } from "../components/CartItemDetail"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import AddressForm from "./components/AddressForm"
import { useEffect, useState } from "react"
import { revalidatePath } from "next/cache"

export default function Checkout() {
  const { state, dispatch, totalCost } = useCartContext()
  const [orderSuccessful, setOrderSuccessful] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const [cost, setCost] = useState(0)

  useEffect(() => {
    setItems(Object.values(state.items))
    setCost(totalCost)
  }, [state, totalCost])
  async function handlePlaceOrder(values: any) {
    try {
      const body = { ...values, products: Object.values(state.items) }
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      dispatch({ type: ActionTypes.ClearCart, payload: null })
      setOrderSuccessful(true)
      revalidatePath("/products")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="mx-auto mt-6 flex flex-col w-4/5 max-w-[1500px] md:flex-row gap-4">
      {orderSuccessful ? (
        <div>success!</div>
      ) : (
        <>
          <Card className="flex flex-[2]">
            <CardContent className="w-full">
              <CardHeader className="text-3xl font-bold">
                Shipping Address
              </CardHeader>
              <CardContent>
                <AddressForm handlePlaceOrder={handlePlaceOrder} />
              </CardContent>
            </CardContent>
          </Card>

          <Card
            className="flex flex-1 flex-col gap-4
       md:self-start min-w-[300px]"
          >
            <CardHeader className="text-3xl font-bold">Your Order</CardHeader>
            <CardContent>
              {items.length ? (
                items.map((item: Item) => (
                  <CartItemDetail key={item.product.id} item={item} />
                ))
              ) : (
                <p>Cart is empty - add more items!</p>
              )}
              <div className="mt-4 w-full flex flex-row items-center justify-between">
                <h4 className="text-lg font-semibold"> Subtotal</h4>
                <span className="text-xl font-semibold">
                  ${cost.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
