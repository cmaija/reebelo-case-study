"use client"

import { CldImage } from "next-cloudinary"
import Link from "next/link"
interface ProductImageProps {
  url: string | null
  title: string
  id: number
}
export default function ProductImage({ url, title, id }: ProductImageProps) {
  let tempUrl =
    "https://res.cloudinary.com/dintrgbvw/image/upload/v1695238530/sample.jpg"
  if (tempUrl && tempUrl.length) {
    return (
      <Link href={`products/${id}`}>
        <CldImage
          width="400"
          height="600"
          src={tempUrl}
          sizes="100vw"
          alt={title}
        />
      </Link>
    )
  }
  return (
    <div className="w-[960] h-[600] bg-slate-300" title={title}>
      <span>?</span>
    </div>
  )
}
