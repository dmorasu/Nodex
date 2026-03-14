"use client"

import { useEffect, useState } from "react"
import { transportadorasSchema } from "@/src/schemas"

type Props = {
  name: string
  defaultValue?: number
}

export default function TransportadorasSelect({ name, defaultValue }: Props) {

  const [data, setData] = useState<{ id: number; nombreTransportadora: string }[]>([])
  const [selected, setSelected] = useState<string>("")

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/transportadora`)
      .then(res => res.json())
      .then(json => {

        const result = transportadorasSchema.parse(json)

        setData(result)

      })
      .catch(error => {
        console.error("Error cargando transportadoras", error)
      })

  }, [])


  useEffect(() => {

    if (defaultValue !== undefined && data.length > 0) {
      setSelected(String(defaultValue))
    }

  }, [defaultValue, data])


  return (
    <select
      name={name}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="w-full p-3 border border-gray-100 bg-slate-100"
    >

      <option value="">Seleccione la Transportadora</option>

      {data.map(op => (
        <option key={op.id} value={op.id}>
          {op.nombreTransportadora}
        </option>
      ))}

    </select>
  )
}