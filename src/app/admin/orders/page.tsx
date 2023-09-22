import OrdersTable from "./OrdersTable"
export default async function Orders() {
  return (
    <div className="max-w-[1800px] w-4/5 mx-auto pt-6">
      <h1 className="text-3xl font-bold mb-4">Manage Orders</h1>
      <OrdersTable />
    </div>
  )
}
