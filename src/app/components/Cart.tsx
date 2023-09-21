"use client"
import { useCartContext } from "@/context/Cart.context"
import { useState, useEffect } from "react"
import CartDetails from "./CartDetails"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
export default function Cart() {
  const { itemsCount } = useCartContext()
  const [displayedCount, setDisplayedCount] = useState(0)

  useEffect(() => {
    setDisplayedCount(itemsCount)
  }, [itemsCount])

  return (
    <AlertDialog>
      <CartDetails />
      <AlertDialogTrigger>Cart: {displayedCount}</AlertDialogTrigger>
    </AlertDialog>
  )
}
