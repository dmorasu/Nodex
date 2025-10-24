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

interface Municipio {
  id: number
  nombreMunicipio: string
  departamento: string
  regional: string
}

interface Props {
  onChange?: (municipioId: number | null) => void // 👈 Nueva prop
  name?: string // 👈 opcional: para enviar en form
  defaultValue?:string
}

export default function MunicipiosComboBox({ onChange, name = 'municipioId' ,defaultValue}: Props) {
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const [selectedMunicipio, setSelectedMunicipio] = useState<Municipio | null>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    
const fetchMunicipios = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/municipios`)
      const data = await response.json()
      setMunicipios(data)

      if (defaultValue) {
        const municipioInicial = data.find((m: Municipio) => m.nombreMunicipio === defaultValue)
        if (municipioInicial) {
          setSelectedMunicipio(municipioInicial)
        }
      }
    } catch (error) {
      console.error('Error al cargar municipios:', error)
    }
  }

  fetchMunicipios()
}, [defaultValue])


  const filteredMunicipios =
    query === ''
      ? municipios
      : municipios.filter((m) =>
          m.nombreMunicipio.toLowerCase().includes(query.toLowerCase())
        )

  const handleSelect = (municipio: Municipio | null) => {
    setSelectedMunicipio(municipio)
    setOpen(false)
    setQuery('')
    onChange?.(municipio ? municipio.id : null) // 👈 avisamos al padre
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full  p-3 font-bold border border-pra-300 bg-white text-orange-500 rounded-xl"
      >
        {selectedMunicipio ? selectedMunicipio.nombreMunicipio : 'Seleccionar municipio...'}
      </button>

      {/* 🔒 input oculto que se envía con el form */}
      <input type="hidden" name={name} value={selectedMunicipio?.id ?? ''} />

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-lg shadow-blue-400">
            <h2 className="text-gray-700 mb-2">Selecciona un municipio</h2>

            <Combobox value={selectedMunicipio} onChange={handleSelect}>
              <ComboboxInput
                aria-label="Buscar municipio"
                displayValue={(m: Municipio | null) => m?.nombreMunicipio ?? ''}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border p-2 rounded mb-2"
                placeholder="Buscar municipio..."
              />

              <div className="max-h-80 overflow-y-auto border rounded">
                <ComboboxOptions>
                  {filteredMunicipios.length === 0 ? (
                    <p className="p-2 text-gray-500 text-sm text-center">
                      No se encontraron municipios
                    </p>
                  ) : (
                    filteredMunicipios.map((m) => (
                      <ComboboxOption
                        key={m.id}
                        value={m}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      >
                        {m.nombreMunicipio}
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
