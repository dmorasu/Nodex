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

interface Estado {
  id: number
  nombreEstado: string
}

interface Props {
  onChange?: (estadoId: number | null) => void
  name?: string
  defaultValue?: string
}

export default function EstadosComboBox({ onChange, name = 'estadoId', defaultValue }: Props) {
  const [estados, setEstados] = useState<Estado[]>([])
  const [selectedEstado, setSelectedEstado] = useState<Estado | null>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/estados`)
        const data = await response.json()
        // Filtra estados nulos
        const validos = data.filter((e: Estado) => e && e.nombreEstado)
        setEstados(validos)

        if (defaultValue) {
          const estadoInicial = validos.find((m: Estado) => m.nombreEstado === defaultValue)
          if (estadoInicial) {
            setSelectedEstado(estadoInicial)
          }
        }
      } catch (error) {
        console.error('Error al cargar estados:', error)
      }
    }

    fetchEstados()
  }, [defaultValue])

  const filteredEstados =
    query.trim() === ''
      ? estados // 👈 si no hay texto, muestra todos
      : estados.filter((m) =>
          m.nombreEstado.toLowerCase().includes(query.toLowerCase())
        )

  const handleSelect = (estado: Estado | null) => {
    setSelectedEstado(estado)
    setOpen(false)
    setQuery('')
    onChange?.(estado ? estado.id : null)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full p-3 font-bold border border-pra-300 bg-white text-orange-500 rounded-xl"
      >
        {selectedEstado ? selectedEstado.nombreEstado : 'Seleccionar Estado...'}
      </button>

      <input type="hidden" name={name} value={selectedEstado?.id ?? ''} />

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-lg shadow-blue-400">
            <h2 className="text-gray-700 mb-2">Selecciona un estado</h2>

            <Combobox value={selectedEstado} onChange={handleSelect}>
              <ComboboxInput
                aria-label="Buscar Estado"
                displayValue={(m: Estado | null) => m?.nombreEstado ?? ''}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border p-2 rounded mb-2"
                placeholder="Buscar Estado..."
              />

              <div className="max-h-80 overflow-y-auto border rounded">
                <ComboboxOptions>
                  {filteredEstados.length === 0 ? (
                    <p className="p-2 text-gray-500 text-sm text-center">
                      No se encontraron estados
                    </p>
                  ) : (
                    filteredEstados.map((m) => (
                      <ComboboxOption
                        key={m.id}
                        value={m}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      >
                        {m.nombreEstado}
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
