"use client"
import { useCartContext } from "@/context/Cart.context"
export default function Cart() {
  const { state, dispatch } = useCartContext()
  return <div>Cart: {state.items.length}</div>
}
