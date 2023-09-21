"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Item, useCartContext } from "@/context/Cart.context"
import { CartItemDetail } from "./CartItemDetail"

export default function CartDetails() {
  const { state } = useCartContext()
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Cart</AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-4 w-full">
          {Object.values(state.items).map((item: Item) => (
            <CartItemDetail item={item} />
          ))}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
