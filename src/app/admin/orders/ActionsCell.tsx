import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Order } from "@prisma/client"
import { MoreHorizontal } from "lucide-react"
import EditOrderModal from "./EditOrderModal"
import { useState } from "react"
import EditOrderProductsModal from "./EditOrderProductsModal"
import DeleteOrderModal from "./DeleteOrderModal"

interface Props {
  order: Order
  onSuccess: () => void
}
export default function ActionsCell({ order, onSuccess }: Props) {
  const [editOrderModalOpen, setEditOrderModalOpen] = useState(false)
  const [editProductsModalOpen, setEditProductsModalOpen] = useState(false)
  const [deleteOrderModalOpen, setDeleteOrderModalOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditOrderModalOpen(true)}>
            View/Edit Order
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditProductsModalOpen(true)}>
            View/Edit Products
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteOrderModalOpen(true)}>
            Delete Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditOrderModal
        open={editOrderModalOpen}
        setOpen={setEditOrderModalOpen}
        order={order}
        onSuccess={onSuccess}
      />
      <EditOrderProductsModal
        open={editProductsModalOpen}
        setOpen={setEditProductsModalOpen}
        id={order.id}
        onSuccess={onSuccess}
      />
      <DeleteOrderModal
        open={deleteOrderModalOpen}
        setOpen={setDeleteOrderModalOpen}
        id={order.id}
        onSuccess={onSuccess}
      />
    </>
  )
}
