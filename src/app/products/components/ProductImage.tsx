"use client"

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
          height="353"
          src={url}
          sizes="100vw"
          alt={title}
        />
      </Link>
    )
  }
  return (
    <div
      className="w-[400px] h-[353px] min-h-600 bg-slate-200 flex items-center justify-center"
      title={title}
    >
      <span className="text-6xl text-white">?</span>
    </div>
  )
}
