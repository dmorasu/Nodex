'use client'

import { useEffect, useState } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  Dialog,
  DialogBackdrop,
  DialogPanel
} from '@headlessui/react'
import { useClientesSearch } from '@/hooks/useClientesSearch'

interface Cliente {
  id: number
  nombreCliente: string
  identificacionCliente: string
}

interface Props {
  onChange?: (id: number | null) => void
  name?: string
  defaultValue?: number
}

export default function ClientesComboBox({ onChange, name = 'clienteId', defaultValue }: Props) {
  const { search, setSearch, results, loading } = useClientesSearch()
  const [selected, setSelected] = useState<Cliente | null>(null)
  const [open, setOpen] = useState(false)

  // Cargar cliente inicial si viene defaultValue
  useEffect(() => {
    const load = async () => {
      if (!defaultValue) return
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${defaultValue}`)
      const data = await r.json()
      setSelected(data)
    }
    load()
  }, [defaultValue])

  const handleSelect = (c: Cliente | null) => {
    setSelected(c)
    setOpen(false)
    setSearch('')          // 🔥 IMPORTANTE: limpiar búsqueda
    onChange?.(c ? c.id : null)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full p-3 font-bold border bg-white text-orange-500 rounded-xl"
      >
        {selected
          ? `${selected.nombreCliente} (${selected.identificacionCliente})`
          : 'Seleccionar Cliente...'}
      </button>

      {/* Hidden Input */}
      <input type="hidden" name={name} value={selected?.id ?? ''} />

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-lg">
            <h2 className="text-gray-700 mb-2">Buscar Cliente</h2>

            <Combobox value={selected} onChange={handleSelect}>
              <ComboboxInput
                className="w-full border p-2 rounded mb-2"
                placeholder="Buscar cliente..."
                displayValue={(c: Cliente) =>
                  c ? `${c.nombreCliente} (${c.identificacionCliente})` : ''
                }
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Estado de carga */}
              {loading && (
                <p className="p-2 text-gray-500 text-sm">Buscando...</p>
              )}

              {/* Lista de resultados */}
              <div className="border rounded max-h-64 overflow-y-auto">
                {search.length >= 2 && results.length === 0 && !loading ? (
                  <p className="p-2 text-gray-400 text-sm text-center">
                    No se encontraron clientes
                  </p>
                ) : (
                  results.map((c) => (
                    <ComboboxOption
                      key={c.id}
                      value={c}
                      className="cursor-pointer px-3 py-2 hover:bg-orange-200"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{c.nombreCliente}</span>
                        <span className="text-sm text-gray-600">
                          {c.identificacionCliente}
                        </span>
                      </div>
                    </ComboboxOption>
                  ))
                )}
              </div>
            </Combobox>

            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-blue-500 hover:bg-orange-500 text-white px-4 py-1 rounded"
              >
                Cerrar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
