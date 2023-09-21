"use client"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Item, useCartContext } from "@/context/Cart.context"
import { CartItemDetail } from "./CartItemDetail"
import { DialogClose } from "@radix-ui/react-dialog"

interface Props {
  onGoToCheckout: () => void
}
export default function CartDetails({ onGoToCheckout }: Props) {
  const { state } = useCartContext()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cart</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 w-full">
        {Object.values(state.items).length ? (
          Object.values(state.items).map((item: Item) => (
            <CartItemDetail key={item.product.id} item={item} />
          ))
        ) : (
          <p>Cart is empty - add more items!</p>
        )}
      </div>
      <DialogFooter>
        <DialogClose onClick={onGoToCheckout}>Checkout</DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
