import { getOrders } from "@/utils/get-orders"

export default async function Orders() {
  let orders = await getOrders()

  const headers = [
    {
      id: "id",
      title: "Order ID",
    },
    {
      id: "name",
      title: "Name",
    },
    {
      id: "email",
      title: "Email",
    },
    {
      id: "address",
      title: "Address",
    },
    {
      id: "productCount",
      title: "# Products",
    },
    {
      id: "actions",
      title: "",
    },
  ]

  return (
    <div>
      <h1>Manage Orders</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.id} id={header.id}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>{order.products.length}</td>
              <td>
                <button>View</button>
                <button>Mark as Paid</button>
                <button>Mark as Delivered</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
