'use client'

import Link from "next/link"
import { useState } from "react"
import SolicitudTramiteMenu from "@/components/solicitudTramites/MenuSolicitudTramites"
import { formatoFecha } from "@/src/ultis"
import { SolicitudTramites } from "@/src/schemas"

interface Props {
  solicitudes: SolicitudTramites[]
}

export default function CenterPageClient({ solicitudes }: Props) {
  const [busqueda, setBusqueda] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const itemsPorPagina = 6 // 🔹 Puedes ajustar este valor

  // 🔍 Filtrado inteligente
  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const texto = busqueda.toLowerCase()
    return (
      solicitud.id?.toString().includes(texto) ||
      solicitud.clientes?.nombreCliente?.toLowerCase().includes(texto) ||
      solicitud.municipios?.nombreMunicipio?.toLowerCase().includes(texto) ||
      solicitud.detalleSolicitud?.toLowerCase().includes(texto)
    )
  })

  // 🔢 Paginación
  const totalPaginas = Math.ceil(solicitudesFiltradas.length / itemsPorPagina)
  const indiceInicio = (paginaActual - 1) * itemsPorPagina
  const solicitudesPaginadas = solicitudesFiltradas.slice(
    indiceInicio,
    indiceInicio + itemsPorPagina
  )

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-gray-900 my-5">
            Solicitudes Creadas
          </h1>
          <p className="text-xl font-bold">
            Tienes los siguientes{" "}
            <span className="text-sky-500">Trámites:</span>
          </p>
        </div>

        <Link
          href={"/center/solicitudTramites/nueva"}
          className="bg-gray-400 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Crear Trámite
        </Link>
      </div>

      {/* 🔹 Barra de búsqueda */}
      <div className="my-6">
        <input
          type="text"
          placeholder="Buscar solicitud por cliente, municipio o detalle..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value)
            setPaginaActual(1) // Reiniciar a la primera página al buscar
          }}
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {solicitudesPaginadas.length ? (
        <>
          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-4 bg-white p-4 shadow-blue-400 rounded-xl"
          >
            {solicitudesPaginadas.map((solicitud) => (
              <li
                key={solicitud.id}
                className="flex justify-between gap-x-6 p-5 hover:bg-gray-50 transition"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <Link
                        href={`/center/solicitudTramites/${solicitud.id}`}
                        className="cursor-pointer hover:underline text-lg font-bold"
                      >
                        <span className="text-sky-500">ST</span>: {solicitud.id}
                      </Link>
                    </p>

                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <span className="text-sky-500">Cliente:</span>{" "}
                      {solicitud.clientes?.nombreCliente}
                    </p>

                    <p className="text-base font-bold">
                      {solicitud.municipios?.nombreMunicipio}
                    </p>

                    <p className="text-base font-semibold text-gray-600">
                      {solicitud.direccionTramite}
                    </p>

                    <p className="text-base text-gray-500">
                      {solicitud.detalleSolicitud}
                    </p>

                    <p className="text-gray-400 text-sm">
                      Actualizado el:{" "}
                      <span className="font-bold">
                        {formatoFecha(solicitud.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-x-6">
                  <SolicitudTramiteMenu solicitudId={solicitud.id} />
                </div>
              </li>
            ))}
          </ul>

          {/* 🔹 Controles de paginación */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              ← Anterior
            </button>

            <span className="font-semibold">
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Siguiente →
            </button>
          </div>
        </>
      ) : (
        <p className="text-center py-20">
          No hay solicitudes que coincidan con la búsqueda.{" "}
          <Link
            href={"/center/solicitudTramites/nueva"}
            className="bg-orange-500 px-2 py-1 rounded text-white font-bold"
          >
            Crea una solicitud
          </Link>
        </p>
      )}
    </>
  )
}
