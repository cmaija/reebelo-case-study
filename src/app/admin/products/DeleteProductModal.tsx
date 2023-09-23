import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Props {
  id: number
  open: boolean
  setOpen: (open: boolean) => void
}
export default function DeleteProductModal({ id, open, setOpen }: Props) {
  async function handleDeleteProduct() {
    await fetch(`/api/product/${id}`, {
      method: "DELETE",
    })
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild />
      <AlertDialogContent>
        <h2 className="text-xl font-semibold">
          Are you sure you want to delete product #{id}?
        </h2>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct}>Delete</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
