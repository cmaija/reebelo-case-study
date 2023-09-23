import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import EditProductForm from "./EditProductForm"
import { Product } from "@/lib/interfaces"

interface Props {
  product?: Product
  open: boolean
  setOpen: (open: boolean) => void
  onUpdate: (order: EditableProductFields) => void
}

export interface EditableProductFields {
  title: string
  description?: string
  shortDescription?: string
  sku: string
  unitsInStock: number
  price: number
  imageUrl?: string
}

export default function EditProductModal({
  product,
  open,
  setOpen,
  onUpdate,
}: Props) {
  function onProductUpdated(updatedProduct: EditableProductFields) {
    onUpdate(updatedProduct)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild />
      <DialogContent
        onInteractOutside={(event) => {
          event.preventDefault()
        }}
        className="max-h-[80vh] overflow-auto"
      >
        <>
          {product && (
            <div className="flex flex-col overflow-auto">
              <div className="flex flex-row justify-between">
                <h2 className="text-xl font-semibold">
                  Product ID: {product.id}
                </h2>
              </div>
              <div className="flex flex-col mt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Created</span>
                  <span className="text-sm font-semibold">
                    {new Date(product?.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Updated</span>
                  <span className="text-sm font-semibold">
                    {new Date(product?.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
          {product?.id ? (
            <EditProductForm
              product={product}
              productId={product?.id}
              handleUpdateProduct={onProductUpdated}
            />
          ) : (
            <EditProductForm handleUpdateProduct={onProductUpdated} />
          )}
        </>
      </DialogContent>
    </Dialog>
  )
}
