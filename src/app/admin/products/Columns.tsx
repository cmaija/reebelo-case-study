"use client"
import { Product } from "@/lib/interfaces"
import { ColumnDef } from "@tanstack/react-table"
import SortableHeader from "../components/SortableHeader"
import ActionsCell from "./ActionsCell"

export const columns = (
  onOpenProductModal: (id: number) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader title="Product ID" id="id" />,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "unitsInStock",
    header: "# In Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original
      return (
        <ActionsCell openProductModal={onOpenProductModal} product={product} />
      )
    },
  },
]
