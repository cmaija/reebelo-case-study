"use client"
import { useCartContext } from "@/context/Cart.context"
import { useState, useEffect } from "react"
import CartDetails from "./CartDetails"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

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
      <DialogTrigger>Cart: {displayedCount}</DialogTrigger>
    </Dialog>
  )
}
