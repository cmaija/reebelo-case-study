export interface Product {
  id: number
  title: string
  description: string | null
  shortDescription: string | null
  sku: string
  unitsInStock: number
  price: number
  createdAt: Date
  updatedAt: Date
  imageUrl: string | null
}
