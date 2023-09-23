import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import { CartContextProvider } from "@/context/Cart.context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reebelo Case Study",
  description:
    "Baseline Order/Management system for Reebelo Full Stack Engineer position case study ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <CartContextProvider>
          <Navbar />
          {children}
        </CartContextProvider>
      </body>
    </html>
  )
}
