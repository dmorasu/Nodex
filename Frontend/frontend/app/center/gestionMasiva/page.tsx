'use client'

import { useState } from 'react'
import UploadPanel from '../../../components/gestionMasiva/panel'

const tabs = [
  { key: 'estados', label: 'Estados' },
  { key: 'logistica', label: 'Logística' },
  { key: 'tramitador', label: 'Tramitador' },
  { key: 'programacion', label: 'Programación' },
  { key: 'trazabilidad', label: 'Trazabilidad' }
]

export default function Page() {

  const [active, setActive] = useState('estados')

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestión Masiva Nodex
      </h1>
      
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-lg ${
              active === t.key
                ? 'bg-blue-600 text-white'
                : 'bg-white border'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <UploadPanel tipo={active} />

    </div>
  )
}