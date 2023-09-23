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
  onSuccess: () => void
}
export default function DeleteOrderModal({
  id,
  open,
  setOpen,
  onSuccess,
}: Props) {
  async function handleDeleteOrder() {
    await fetch(`/api/order/${id}`, {
      method: "DELETE",
    })
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild />
      <AlertDialogContent>
        <h2 className="text-xl font-semibold">
          Are you sure you want to delete order #{id}?
        </h2>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDeleteOrder}>Delete</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
