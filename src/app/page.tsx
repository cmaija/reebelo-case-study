import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-full overflow-auto flex-col items-center justify-between p-24">
      <div className="z-2 flex-col max-w-5xl w-full items-start justify-between font-mono text-sm lg:flex">
        <h2>Welcome to my Case Study </h2>
        <p>
          Hi, I'm Claire, a full stack developer from Vancouver, BC, Canada.
          Thank you for taking a look at my case study!
        </p>
        <br />
        <p>Take a look at the shop to add items to your cart</p>
        <br />
        <p>
          Click on the cart to view your items, and checkout to create a new
          order.
        </p>
        <br />
        <p>
          Click on the cog to view the admin page, where you can manage orders
          and products.
        </p>
      </div>
    </main>
  )
}
