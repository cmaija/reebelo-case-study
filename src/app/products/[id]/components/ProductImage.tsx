import { Product } from "@/lib/interfaces"
import { QuestionMarkIcon } from "@radix-ui/react-icons"
import { CldImage } from "next-cloudinary"

interface Props {
  product: Product
}
export default function ProductImage({ product }: Props) {
  return (
    <div className="w-full max-h-full h-[400px] flex items-center justify-center">
      {product && product.imageUrl ? (
        <CldImage alt={product.title} src={product.imageUrl} />
      ) : (
        <div
          title="image not found"
          className="text-slate-400 font-bold text-5xl"
        >
          ?
        </div>
      )}
    </div>
  )
}
