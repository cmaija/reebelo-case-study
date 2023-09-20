"use client"

import { useCartContext } from "@/context/Cart.context"

interface Props {
  onClose: () => void
}

export default function CartDetails({ onClose }: Props) {
  const { state, dispatch } = useCartContext()
  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 w-screen h-screen bg-black text-black bg-opacity-40 pointer-events-none flex items-center justify-center">
      <div className="pointer-events-auto w-1/2 h-1/2 bg-white">
        <button className="text-black" onClick={onClose}>
          close
        </button>
        {state.items.map((item) => (
          <div key={item.product.id}>
            <div>{item.product.title}</div>
            <div>{item.units}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
