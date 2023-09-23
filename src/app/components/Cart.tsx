"use client"
import { useCartContext } from "@/context/Cart.context"
import { useState, useEffect } from "react"
import CartDetails from "./CartDetails"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"

export default function Cart() {
  const { itemsCount } = useCartContext()
  const [displayedCount, setDisplayedCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    setDisplayedCount(itemsCount)
  }, [itemsCount])

  function handleGoToCheckout() {
    setTimeout(() => {
      router.push("/checkout")
    }, 0)
  }
  return (
    <Dialog>
      <CartDetails onGoToCheckout={handleGoToCheckout} />
      <DialogTrigger>
        <div className="flex flex-row items-center gap-2">
          <ShoppingCart size={24} />
          <span className="text-lg min-w-[2.5rem]">{displayedCount}</span>
        </div>
      </DialogTrigger>
    </Dialog>
  )
}
