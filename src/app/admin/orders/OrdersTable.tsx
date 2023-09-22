"use client"
import { Order } from "@prisma/client"
import { columns } from "./Columns"
import { DataTable } from "./DataTable"
import { useEffect, useState } from "react"

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>()

  useEffect(() => {
    fetch("/api/order", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }, [])

  function handleNext() {
    let params
    if (orders?.length) {
      params = new URLSearchParams({
        cursor: orders?.[orders.length - 1].id.toString(),
        page: "next",
      })
    }
    fetch("/api/order?" + params, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }

  function handleLast() {
    let params
    if (orders?.length) {
      params = new URLSearchParams({
        cursor: orders?.[orders.length - 1].id.toString(),
        page: "last",
      })
    }
    fetch("/api/order?" + params, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }
  if (orders) {
    return (
      <>
        <DataTable
          columns={columns}
          data={orders}
          onNext={handleNext}
          onLast={handleLast}
        />
      </>
    )
  }
}
