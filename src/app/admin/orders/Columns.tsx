"use client"
import { Order, OrderStatus } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import DateTimeCell from "./DateTimeCell"
import ActionsCell from "./ActionsCell"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created Time",
    cell: ({ row }) => <DateTimeCell value={row.original.createdAt} />,
  },
  {
    accessorKey: "productCount",
    header: "# Products",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original
      return <ActionsCell order={order} />
    },
  },
]
