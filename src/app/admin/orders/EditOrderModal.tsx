import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Order, OrderStatus, ProductsOnOrders } from "@prisma/client"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
import EditOrderForm from "./EditOrderForm"

interface Props {
  order: Order
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess: (order: EditableOrderFields) => void
}

export interface EditableOrderFields {
  status: OrderStatus
  firstName: string
  lastName: string
  email: string
  address1: string
  address2?: string
  city: string
  state: string
  country: string
  postalCode: string
  phoneNumber: string
  details?: string
  trackingNumber?: string
  trackingCompany?: string
}

export default function EditOrderModal({
  order,
  open,
  setOpen,
  onSuccess,
}: Props) {
  function onOrderUpdated(updatedOrder: EditableOrderFields) {
    onSuccess(updatedOrder)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild />
      <DialogContent
        onInteractOutside={(event) => {
          event.preventDefault()
        }}
        className="max-h-[80vh] overflow-auto"
      >
        <div className="flex flex-col overflow-auto">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold">Order #{order.id}</h2>
          </div>
          <div className="flex flex-col mt-4">
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
          </div>
        </div>
        <EditOrderForm
          order={order}
          orderId={order.id}
          handleUpdateOrder={onOrderUpdated}
        />
      </DialogContent>
    </Dialog>
  )
}
