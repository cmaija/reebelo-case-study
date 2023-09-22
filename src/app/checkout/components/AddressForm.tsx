"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createOrder } from "@/utils/create-order"
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

interface Props {
  handlePlaceOrder: (values: z.infer<typeof addressSchema>) => void
}
const addressSchema = z.object({
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
})

export default function AddressForm({ handlePlaceOrder }: Props) {
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  })

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    handlePlaceOrder(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
        <Button type="submit">Place Order</Button>
      </form>
    </Form>
  )
}
