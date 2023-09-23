"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { EditableProductFields } from "./EditProductModal"
import { Product } from "@/lib/interfaces"
import { CldImage, CldUploadButton } from "next-cloudinary"

interface Props {
  handleUpdateProduct: (values: z.infer<typeof productSchema>) => void
  product?: Product | EditableProductFields
  productId?: number
}
const productSchema = z.object({
  title: z.string(),
  description: z.string(),
  shortDescription: z.string().optional(),
  sku: z.string(),
  unitsInStock: z.number(),
  price: z.number(),
  imageUrl: z.string().optional(),
})

export default function EditProductForm({
  handleUpdateProduct,
  product,
  productId,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>()
  const [imageResourceUrl, setImageResourceUrl] = useState<string | object>(
    product?.imageUrl || ""
  )

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  })

  async function handleSave() {
    setLoading(true)
    if (product) {
      try {
        await fetch("/api/product", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: productId, ...form.getValues() }),
        })
          .then((response) => response.json())
          .then((data) => handleUpdateProduct(data))
      } catch (error) {
        setError(error)
      }
    } else {
      try {
        await fetch("/api/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form.getValues()),
        })
          .then((response) => response.json())
          .then((data) => handleUpdateProduct(data))
      } catch (error) {
        setError(error)
      }
    }

    setLoading(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={(e: any) => e.preventDefault()} className="space-y-8">
        <FormField
          control={form.control}
          defaultValue={product?.title || ""}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={product?.description || ""}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={product?.shortDescription || ""}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={product?.sku || ""}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={product?.unitsInStock || 0}
          name="unitsInStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel># Units in Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={product?.price || 0}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={handleSave}>
          {product && "id" in product ? "Update" : "Save"} Product
        </Button>
        <FormMessage>{error}</FormMessage>
      </form>
    </Form>
  )
}
