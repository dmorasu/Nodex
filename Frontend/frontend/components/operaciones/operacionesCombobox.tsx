'use client'

import { useEffect, useState } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel
} from '@headlessui/react'

interface Operaciones {
  id: number
  nombreOperacion: string
  
}

interface Props {
  onChange?: (operacionId: number | null) => void // 👈 Nueva prop
  name?: string // 👈 opcional: para enviar en form
  defaultValue?:string
}

export default function OperacionesComboBox({ onChange, name = 'operacionId' ,defaultValue}: Props) {
  const [operaciones, setOperaciones] = useState<Operaciones[]>([])
  const [selectedOperaciones, setSelectedOperaciones] = useState<Operaciones | null>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    
const fetchOperaciones = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/operaciones`)
      const data = await response.json()
      setOperaciones(data)

      if (defaultValue) {
        const operacionInicial = data.find((m: Operaciones) => m.nombreOperacion === defaultValue)
        if (operacionInicial) {
          setSelectedOperaciones(operacionInicial)
        }
      }
    } catch (error) {
      console.error('Error al cargar las Operaciones:', error)
    }
  }

  fetchOperaciones()
}, [defaultValue])


  const filteredOperaciones =
    query === ''
      ?operaciones
      :operaciones.filter((m) =>
          m.nombreOperacion.toLowerCase().includes(query.toLowerCase())
        )

  const handleSelect = (operaciones: Operaciones | null) => {
    setSelectedOperaciones(operaciones)
    setOpen(false)
    setQuery('')
    onChange?.(operaciones ? operaciones.id : null) // 👈 avisamos al padre
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full  p-3 font-bold border border-pra-300 bg-white text-orange-500 rounded-xl"
      >
        {selectedOperaciones ? selectedOperaciones.nombreOperacion : 'Seleccionar Operación...'}
      </button>

      {/* 🔒 input oculto que se envía con el form */}
      <input type="hidden" name={name} value={selectedOperaciones?.id ?? ''} />

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-lg shadow-blue-400">
            <h2 className="text-gray-700 mb-2">Seleccionar Operación</h2>

            <Combobox value={selectedOperaciones} onChange={handleSelect}>
              <ComboboxInput
                aria-label="Buscar operacion"
                displayValue={(m: Operaciones | null) => m?.nombreOperacion ?? ''}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border p-2 rounded mb-2"
                placeholder="Buscar operacion..."
              />

              <div className="max-h-80 overflow-y-auto border rounded">
                <ComboboxOptions>
                  {filteredOperaciones.length === 0 ? (
                    <p className="p-2 text-gray-500 text-sm text-center">
                      No se encontraron municipios
                    </p>
                  ) : (
                    filteredOperaciones.map((m) => (
                      <ComboboxOption
                        key={m.id}
                        value={m}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      >
                        {m.nombreOperacion}
                      </ComboboxOption>
                    ))
                  )}
                </ComboboxOptions>
              </div>

              <div className="flex justify-end mt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-blue-500 hover:bg-orange-500 text-white px-4 py-1 rounded"
                >
                  Cerrar
                </button>
              </div>
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
