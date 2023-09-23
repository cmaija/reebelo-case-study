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
import { Order, OrderStatus } from "@prisma/client"
import React, { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { EditableOrderFields } from "./EditOrderModal"

interface Props {
  handleUpdateOrder: (values: z.infer<typeof orderSchema>) => void
  order?: Order | EditableOrderFields
  orderId: number
}
const orderSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  phoneNumber: z.string(),
  details: z.string(),
  trackingNumber: z.string().optional(),
  trackingCompany: z.string().optional(),
  status: z.enum([
    "RECEIVED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
})

export default function EditOrderForm({
  handleUpdateOrder,
  order,
  orderId,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>()
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
  })

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (order) {
      setLoading(true)
      try {
        await fetch(`/api/order/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: orderId, ...form.getValues() }),
        })
          .then((response) => response.json())
          .then((data) => handleUpdateOrder(data))
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          defaultValue={order?.firstName}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.lastName}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.email}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.address1}
          name="address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address 1</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.address2 || ""}
          name="address2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address 2</FormLabel>
              <FormControl>
                <Input placeholder="Unit 10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.city}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="San Francisco" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.state}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="California" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.country}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.postalCode}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip/Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="94941" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.phoneNumber}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={order?.status}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <select value={field.value} onChange={field.onChange}>
                  {Object.values(OrderStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          defaultValue={order?.details || ""}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Details</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          defaultValue={order?.trackingNumber || ""}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="Tracking Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          defaultValue={order?.trackingCompany || ""}
          name="trackingCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Company</FormLabel>
              <FormControl>
                <Input placeholder="Tracking Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={handleClick}>Update Order</Button>
        <FormMessage>{error}</FormMessage>
      </form>
    </Form>
  )
}
