import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/interfaces"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import { CameraIcon } from "lucide-react"
import { CldImage, CldUploadButton } from "next-cloudinary"
import { useEffect, useState } from "react"

interface Props {
  product: Product
  onSuccess: () => void
}
export default function ManageImage({ product, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState<string>(product?.imageUrl || "")

  useEffect(() => {
    setUrl(product?.imageUrl || "")
  }, [product])

  async function updateProduct(url: string) {
    setLoading(true)
    try {
      await fetch("/api/product", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, imageUrl: url }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUrl(url)
          onSuccess()
        })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <div className="flex flex-row items-center gap-4">
      {url && (
        <AlertDialog>
          <AlertDialogTrigger>View Product Image</AlertDialogTrigger>
          <AlertDialogContent>
            <CldImage
              width="400"
              height="600"
              src={url}
              sizes="100vw"
              alt={product.title}
            />
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <CldUploadButton
        className=""
        onUpload={(result, widget) => {
          updateProduct(
            typeof result?.info === "object" && "secure_url" in result?.info
              ? `${result?.info?.secure_url}`
              : ""
          )
          widget.close()
        }}
        uploadPreset="uan0y4ti"
      >
        <CameraIcon />
      </CldUploadButton>
    </div>
  )
}
