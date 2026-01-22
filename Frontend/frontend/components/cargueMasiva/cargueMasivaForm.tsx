'use client'
import { useState } from 'react'

export default function CargaMasivaSolicitudes() {

  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [resultado, setResultado] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [modo, setModo] = useState<'validar' | 'cargar' | null>(null)

  // ==========================
  // 📄 Descargar plantilla
  // ==========================
  const descargarPlantilla = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/solicitudTramites/plantilla`
  }

  // ==========================
  // ✅ VALIDAR EXCEL
  // ==========================
  const validarArchivo = () => {
    if (!file) return

    setLoading(true)
    setResultado(null)
    setModo('validar')

    const formData = new FormData()
    formData.append('file', file)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudTramites/validar-excel`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        setResultado(json)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        alert('Error validando archivo')
      })
  }

  // ==========================
  // 📥 CARGAR EXCEL
  // ==========================
  const subirArchivo = () => {
    if (!file) return

    setLoading(true)
    setProgress(0)
    setResultado(null)
    setModo('cargar')

    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/solicitudTramites/carga-masiva`)

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)
        setProgress(percent)
      }
    }

    xhr.onload = () => {
      const json = JSON.parse(xhr.responseText)
      setResultado(json)
      setLoading(false)
    }

    xhr.onerror = () => {
      setLoading(false)
      alert('Error en la carga')
    }

    xhr.send(formData)
  }

  // ==========================

  return (
    <div className="border p-6 rounded-xl shadow-lg space-y-6 max-w-xl bg-white">

      <h2 className="text-xl font-bold text-gray-800">
        Carga masiva de Solicitudes de Trámite
      </h2>

      {/* 📄 Descargar plantilla */}
      <button
        onClick={descargarPlantilla}
        className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-medium py-2 rounded-lg transition"
      >
        📄 Descargar plantilla Excel
      </button>

      {/* 📂 Input archivo */}
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border rounded-lg p-2"
      />

      {/* 🔹 Botones acción */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={validarArchivo}
          disabled={!file || loading}
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
        >
          Validar Excel
        </button>

        <button
          onClick={subirArchivo}
          disabled={!file || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
        >
          Cargar Excel
        </button>
      </div>

      {/* 🔹 Barra de progreso solo en carga */}
      {loading && modo === 'cargar' && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Subiendo archivo... {progress}%
          </p>
        </div>
      )}

      {/* 🔹 Mensaje mientras valida */}
      {loading && modo === 'validar' && (
        <p className="text-sm text-gray-600 text-center">
          Validando archivo...
        </p>
      )}

      {/* 🔹 Resultado general */}
      {resultado && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1 text-sm">
          <p><span className="font-semibold">Total filas:</span> {resultado.totalProcesados}</p>

          {modo === 'cargar' && (
            <>
              <p className="text-green-600 font-semibold">
                Guardadas: {resultado.creados.length}
              </p>
              <p className="text-red-500 font-semibold">
                Errores: {resultado.errores.length}
              </p>
            </>
          )}

          {modo === 'validar' && (
            <p className="font-semibold">
              Errores encontrados: 
              <span className="text-red-600"> {resultado.errores.length}</span>
            </p>
          )}
        </div>
      )}

      {/* 🔴 Detalle errores */}
      {resultado?.errores?.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm space-y-2">
          <p className="font-semibold text-red-700">
            Detalle de errores:
          </p>

          <div className="max-h-40 overflow-y-auto space-y-1">
           {resultado.errores.map((err:any, index:number)=>(
  <div key={index} className="text-red-600">
    Fila {err.fila}: {err.error}
  </div>
))}

          </div>
        </div>
      )}

      {/* ✅ Validación exitosa */}
      {modo === 'validar' && resultado?.errores?.length === 0 && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm font-semibold text-center">
          Archivo validado correctamente. Ya puedes cargarlo.
        </div>
      )}
    </div>
  )
}
