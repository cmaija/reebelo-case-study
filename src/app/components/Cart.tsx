"use client"
import { useCartContext } from "@/context/Cart.context"
import { useState } from "react"
import CartDetails from "./CartDetails"
export default function Cart() {
  const { state, dispatch } = useCartContext()
  const [cartShowing, setCartShowing] = useState(false)

  function toggleCartShowing() {
    setCartShowing(!cartShowing)
  }
  return (
    <div className="relative">
      {cartShowing && <CartDetails onClose={() => setCartShowing(false)} />}
      <button onClick={toggleCartShowing}>Cart: {state.items.length}</button>
    </div>
  )
}
