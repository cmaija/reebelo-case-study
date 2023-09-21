"use client"

import { Item, useCartContext } from "@/context/Cart.context"
import { CartItemDetail } from "../components/CartItemDetail"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AddressForm from "./components/AddressForm"

export default function Checkout() {
  const { state, dispatch } = useCartContext()
  return (
    <div className="mx-auto mt-6 w-full flex flex-col w-75% max-w-[1500px] min-w-[450px] md:flex-row gap-4">
      <Card className="flex flex-1">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Address</AccordionTrigger>
            <AccordionContent>
              <AddressForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card className="flex flex-1 flex-col gap-4">
        <CardHeader className="text-3xl font-bold">Your Order</CardHeader>
        <CardContent>
          {Object.values(state.items).length ? (
            Object.values(state.items).map((item: Item) => (
              <CartItemDetail key={item.product.id} item={item} />
            ))
          ) : (
            <p>Cart is empty - add more items!</p>
          )}
        </CardContent>
        <CardFooter>
          <Button>Place Order</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
