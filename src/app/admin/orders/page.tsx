export default function Orders() {
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
      </table>
    </div>
  )
}
