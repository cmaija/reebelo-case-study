import Link from "next/link"
import Cart from "./Cart"

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-center flex-col bg-red-500 md:py-6 py-2">
      <div className="text-white text-lg font-bold">
        <Link href="/">
          <h1>NADA GROCERIES</h1>
        </Link>
        <Cart />
      </div>
      <div>
        <Link href="/products">Shop</Link>
        <Link href="/orders">Manage</Link>
      </div>
    </nav>
  )
}
