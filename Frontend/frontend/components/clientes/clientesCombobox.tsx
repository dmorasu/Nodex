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

interface Clientes {
  id: number
  nombreCliente: string
  
}

interface Props {
  onChange?: (clienteId: number | null) => void // 👈 Nueva prop
  name?: string // 👈 opcional: para enviar en form
  defaultValue?:string
}

export default function ClientesComboBox({ onChange, name = 'clienteId',defaultValue }: Props) {
  const [clientes, setClientes] = useState<Clientes[]>([])
  const [selectedClientes, setSelectedClientes] = useState<Clientes | null>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes`)
        const data = await response.json()
        setClientes(data)

        if (defaultValue) {
        const clienteInicial = data.find((m: Clientes) => m.nombreCliente === defaultValue)
        if (clienteInicial) {
          setSelectedClientes(clienteInicial)
        }
      }
      } catch (error) {
        console.error('Error al cargar Clientes:', error)
      }
    }

    fetchClientes()
  }, [defaultValue])

  const filteredClientes =
    query === ''
      ? clientes
      : clientes.filter((m) =>
          m.nombreCliente.toLowerCase().includes(query.toLowerCase())
        )

  const handleSelect = (cliente: Clientes | null) => {
    setSelectedClientes(cliente)
    setOpen(false)
    setQuery('')
    onChange?.(cliente ? cliente.id : null) // 👈 avisamos al padre
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full  p-3 font-bold border border-pra-300 bg-white text-orange-500 rounded-xl"
      >
        {selectedClientes ? selectedClientes.nombreCliente : 'Seleccionar Cliente...'}
      </button>

      {/* 🔒 input oculto que se envía con el form */}
      <input type="hidden" name={name} value={selectedClientes?.id ?? ''} />

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-lg shadow-blue-400">
            <h2 className="text-gray-700 mb-2">Buscar Cliente</h2>

            <Combobox value={selectedClientes} onChange={handleSelect}>
              <ComboboxInput
                aria-label="Buscar municipio"
                displayValue={(m: Clientes | null) => m?.nombreCliente ?? ''}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border p-2 rounded mb-2"
                placeholder="Buscar cliente..."
              />

              <div className="max-h-80 overflow-y-auto border rounded">
                <ComboboxOptions>
                  {filteredClientes.length === 0 ? (
                    <p className="p-2 text-gray-500 text-sm text-center">
                      No se encontraron Clientes
                    </p>
                  ) : (
                    filteredClientes.map((m) => (
                      <ComboboxOption
                        key={m.id}
                        value={m}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      >
                        {m.nombreCliente}
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