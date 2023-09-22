import { useEffect, useState } from "react"

export default function DateTimeCell({ value }: { value: Date }) {
  const [date, setDate] = useState(new Date(value).toLocaleDateString())
  useEffect(() => {
    setDate(new Date(value).toLocaleString())
  }, [value])

  return <div>{date}</div>
}
