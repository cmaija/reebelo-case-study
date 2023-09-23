"use client"
import Link from "next/link"
import Cart from "./Cart"
import { usePathname } from "next/navigation"
import { CogIcon } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="w-full flex items-center justify-start flex-col gap-3 bg-blue-400 md:py-6 py-2 px-8">
      <div className="text-white text-4xl font-bold w-full flex flex-row items-center justify-between">
        <Link href="/">
          <h1>REEBELO STORE</h1>
        </Link>
        <Cart />
      </div>
      <div className="text-white text-lg font-bold w-full flex flex-row items-center justify-between">
        <Link href="/products">Shop</Link>
        <Link title="Mange Orders and Products" href="/admin/orders">
          <CogIcon size={24} />
        </Link>
      </div>
      {pathname.includes("admin") && (
        <div className="text-white text-lg font-bold w-full flex flex-row gap-4 items-center justify-end">
          <Link href="/admin/products">Manage Products</Link>
          <Link href="/admin/orders">Manage Orders</Link>
        </div>
      )}
    </nav>
  )
}
