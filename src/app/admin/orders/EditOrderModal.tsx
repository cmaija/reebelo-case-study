import { Dialog, DialogContent } from "@/components/ui/dialog"
import { getOrder } from "@/utils/get-order"
import { Order, ProductsOnOrders } from "@prisma/client"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"

interface Props {
  order: Order
  open: boolean
  setOpen: (open: boolean) => void
}
export default function EditOrderModal({ order, open, setOpen }: Props) {
  const [orderDetails, setOrderDetails] = useState<ProductsOnOrders>()

  useEffect(() => {
    if (open) {
      fetch("/api/order?" + new URLSearchParams({ id: order.id.toString() }), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => setOrderDetails(data))
    }
  }, [open, order])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild />
      <DialogContent
        onInteractOutside={(event) => {
          event.preventDefault()
        }}
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Status</span>
              <span className="text-sm font-semibold">
                {order.status.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Created</span>
              <span className="text-sm font-semibold">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Updated</span>
              <span className="text-sm font-semibold">
                {new Date(order.updatedAt).toLocaleString()}
              </span>
            </div>
            <span>{JSON.stringify(orderDetails)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
