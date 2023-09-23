"use client"
import { Product } from "@/lib/interfaces"
import { columns } from "./Columns"
import { DataTable } from "../components/DataTable"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import EditProductModal from "./EditProductModal"

interface ProductUrlParams extends Record<any, any> {
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
  let params: ProductUrlParams = {}
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

export default function ProductTable() {
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>()
  const [selectedProduct, setSelectedProduct] = useState<Product>()

  const params = useSearchParams()
  const router = useRouter()
  const sort = params.get("sort")
  const page = params.get("page") || "1"

  useEffect(() => {
    let paramOptions: ProductUrlParams = generateSearchParams({ sort, page })

    const params = new URLSearchParams(paramOptions)
    fetch("/api/product?" + params, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
      })
  }, [sort, page])

  function handleNext() {
    let newParams = new URLSearchParams(params)
    newParams.set("page", (parseInt(page) + 1).toString())
    router.push("/admin/products?" + newParams.toString())
  }

  function handleLast() {
    let newParams = new URLSearchParams(params)
    newParams.set("page", (parseInt(page) - 1).toString())
    router.push("/admin/products?" + newParams.toString())
  }

  function setAddModalOpen(open: boolean) {
    if (open) {
      setSelectedProduct(undefined)
      setProductModalOpen(true)
    } else {
      setProductModalOpen(false)
    }
  }

  function setEditModalOpen(id: number) {
    if (productModalOpen) {
      setSelectedProduct(undefined)
      setProductModalOpen(false)
    } else {
      setSelectedProduct(
        products?.find((product: Product) => product.id === id)
      )
      setProductModalOpen(true)
    }
  }

  function onSuccess() {
    let paramOptions: ProductUrlParams = generateSearchParams({ sort, page })

    const params = new URLSearchParams(paramOptions)
    fetch("/api/product?" + params, {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
      })
  }
  if (products) {
    return (
      <>
        <div className="w-full flex justify-end mb-3">
          <Button onClick={() => setAddModalOpen(true)}>Add Product</Button>
        </div>
        <EditProductModal
          open={productModalOpen}
          setOpen={setAddModalOpen}
          onUpdate={onSuccess}
          product={selectedProduct}
        />
        <DataTable
          columns={columns(setEditModalOpen, onSuccess)}
          data={products}
          onNext={handleNext}
          onLast={handleLast}
          canNext={products.length === 10}
          canLast={parseInt(page) > 1}
        />
      </>
    )
  } else {
    return (
      <div>
        <span>There are no products yet! Click add product button</span>
        <div>
          <Button onClick={() => setAddModalOpen(true)}>Add Product</Button>
        </div>
      </div>
    )
  }
}
