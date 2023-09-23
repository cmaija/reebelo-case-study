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
  const { state, totalCost } = useCartContext()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cart</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 w-full">
        {Object.values(state.items).length ? (
          <div>
            {Object.values(state.items).map((item: Item) => (
              <CartItemDetail key={item.product.id} item={item} />
            ))}
            <div className="mt-4 w-full flex flex-row items-center justify-between">
              <h4 className="text-lg font-semibold"> Subtotal</h4>
              <span className="text-xl font-semibold">
                ${totalCost.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <p>Cart is empty - add more items!</p>
        )}
      </div>
      <DialogFooter>
        <DialogClose
          disabled={!Object.values(state.items).length}
          onClick={onGoToCheckout}
        >
          Checkout
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
