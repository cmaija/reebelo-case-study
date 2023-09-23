"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useMemo } from "react"

interface Props {
  title: string
  id: string
}

export default function SortableHeader({ title, id }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const sort = params.get("sort")
  const isSorted = useMemo(() => {
    if (!sort) return true
    let [key] = sort.split(":")
    return key === id
  }, [sort])

  const sortDirection = useMemo(() => {
    if (!sort) return "desc"
    let [key, direction] = sort.split(":")
    return direction
  }, [sort])

  function onSort() {
    let direction = "asc"
    if (sort) {
      let [key, dir] = sort.split(":")
      direction = dir === "desc" ? "asc" : "desc"
    }
    let newSort = `${id}:${direction}`
    router.push("/admin/orders" + `?sort=${newSort}`)
  }
  return (
    <Button variant="ghost" onClick={onSort}>
      {title}
      {isSorted &&
        (sortDirection === "desc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        ))}
    </Button>
  )
}
