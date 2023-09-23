"use client"
import { Order } from "@prisma/client"
import { columns } from "./Columns"
import { DataTable } from "../components/DataTable"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface OrderUrlParams extends Record<any, any> {
  sortBy?: "id" | "createdAt"
  sortDir?: "desc" | "asc"
  take?: string | null
  skip?: string | null
}

function generateSortParamsFromURLParams(
  sort?: string | null
): { sortBy?: "id" | "createdAt"; sortDir?: "desc" | "asc" } | undefined {
  if (sort) {
    let sortBy: "createdAt" | "id" | undefined
    let sortDir: "desc" | "asc" | undefined
    let [key, direction] = sort.split(":")
    direction = direction.toLowerCase()
    if (key === "createdAt" || key === "id") {
      sortBy = key
    }

    sortBy = key === "createdAt" || key === "id" ? key : "id"

    if (direction === "asc" || direction === "desc") {
      sortDir = direction
    }

    return {
      sortBy,
      sortDir,
    }
  }
}

function generateSearchParams({
  sort,
  take,
  page,
}: {
  sort?: string | null
  take?: string | null
  page?: string | null
}): URLSearchParams {
  let params: OrderUrlParams = {}
  let sortParams = generateSortParamsFromURLParams(sort)
  if (sortParams && sortParams.sortBy && sortParams.sortDir) {
    params.sortBy = sortParams.sortBy
    params.sortDir = sortParams.sortDir
  }

  let perPage = take ? parseInt(take) : 10
  let pageNumber = page ? parseInt(page) : 1
  params.skip = page && ((pageNumber - 1) * perPage).toString()
  params.take = take || "10"

  return new URLSearchParams(params)
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>()
  const params = useSearchParams()
  const router = useRouter()
  const sort = params.get("sort")
  const page = params.get("page") || "1"

  useEffect(() => {
    let paramOptions: OrderUrlParams = generateSearchParams({ sort, page })

    const params = new URLSearchParams(paramOptions)
    fetch("/api/order?" + params, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
      })
  }, [sort, page])

  function handleNext() {
    let newParams = new URLSearchParams(params)
    newParams.set("page", (parseInt(page) + 1).toString())
    router.push("/admin/orders?" + newParams.toString())
  }

  function handleLast() {
    let newParams = new URLSearchParams(params)
    newParams.set("page", (parseInt(page) - 1).toString())
    router.push("/admin/orders?" + newParams.toString())
  }

  function onSuccess() {
    let paramOptions: OrderUrlParams = generateSearchParams({ sort, page })
    const params = new URLSearchParams(paramOptions)
    fetch("/api/order?" + params, {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
      })
  }
  if (orders) {
    return (
      <>
        <DataTable
          columns={columns(onSuccess)}
          data={orders}
          onNext={handleNext}
          onLast={handleLast}
          canNext={orders.length === 10}
          canLast={parseInt(page) > 1}
        />
      </>
    )
  }
}
