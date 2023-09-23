"use client"
import { Order, OrderStatus } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import DateTimeCell from "../components/DateTimeCell"
import ActionsCell from "./ActionsCell"
import SortableHeader from "../components/SortableHeader"

export const columns = (onSuccess: () => void): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader title="Order ID" id="id" />,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader title="Created At" id="createdAt" />
    ),
    cell: ({ row }) => <DateTimeCell value={row.original.createdAt} />,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original
      return <ActionsCell onSuccess={onSuccess} order={order} />
    },
  },
]
