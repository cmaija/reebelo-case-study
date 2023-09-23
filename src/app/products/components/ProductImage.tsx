"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CldImage } from "next-cloudinary"
import Link from "next/link"
interface ProductImageProps {
  url?: string | null
  title: string
  id: number
}
export default function ProductImage({ url, title, id }: ProductImageProps) {
  if (url && url.length) {
    return (
      <Link href={`products/${id}`}>
        <CldImage
          width="400"
          height="350"
          src={url}
          sizes="100vw"
          crop="thumb"
          alt={title}
        />
      </Link>
    )
  }
  return (
    <AspectRatio
      ratio={8 / 7}
      className="bg-slate-200 flex items-center justify-center"
      title={title}
    >
      <span className="text-6xl text-white">?</span>
    </AspectRatio>
  )
}
