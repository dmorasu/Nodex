"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SolicitudTramiteMenu from "@/components/solicitudTramites/MenuSolicitudTramites"
import { formatoFecha } from "@/src/ultis"
import { SolicitudTramites } from "@/src/schemas"
import EliminarSolicitudTramiteModal from "./EliminarSolicitudTramiteModal"
import clsx from "clsx"
import CargaMasivaSolicitudes from "./CargaMasivaSolicitudes"

import ModalContainer from "../ui/ModalContainer"

interface Props {
  solicitudes: SolicitudTramites[]
  totalPages: number
  currentPage: number
  searchInitial: string
}

export default function CenterPageClient({
  solicitudes,
  totalPages,
  currentPage,
  searchInitial
}: Props) {

  const router = useRouter()
  const params = useSearchParams()

  const [search, setSearch] = useState(searchInitial)

  // 🔹 Ejecutar búsqueda en backend
  const ejecutarBusqueda = () => {
    const query = new URLSearchParams(params.toString())

    if (search) query.set("search", search)
    else query.delete("search")

    query.set("page", "1")
    router.push(`?${query.toString()}`)
  }

  // 🔹 Cambiar página en backend
  const cambiarPagina = (page: number) => {
    const query = new URLSearchParams(params.toString())
    query.set("page", page.toString())
    router.push(`?${query.toString()}`)
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
      <div className="my-6 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por ID solicitud o identificación cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={ejecutarBusqueda}
          className="bg-sky-400 px-4 rounded-lg text-white font-bold"
        >
          Buscar
        </button>
      </div>

      {solicitudes.length ? (
        <>
          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-4 bg-white p-4 shadow-blue-400 rounded-xl"
          >
            {solicitudes.map((solicitud) => (
              
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

                    <p className="text-base text-gray-500 text-justify">
                      {solicitud.detalleSolicitud}
                    </p>

                    <p className="text-sky-400 text-sm ">
                      Actualizado el:{" "}
                      <span className="font-bold">
                        {formatoFecha(solicitud.updatedAt)}
                      </span>
                    </p>

                    <p className="text-gray-400 text-sm">
                      Creado por:{" "}
                      <span className="font-bold">
                        {solicitud.usuario?.nombreUsuario}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-y-8">
                  <div
                    className={clsx(
                      "p-2 rounded-lg font-bold w-full md:w-auto text-center",
                      {
                        "bg-red-400 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Sin Iniciar",
                        "bg-amber-400 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "En Curso",
                        "bg-green-500 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Finalizado",
                        "bg-blue-500 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Reprogramado",
                        "bg-orange-500 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Desistido",
                        "bg-purple-500 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Suspendido",
                        "bg-gray-400 text-white":
                          !["Sin Iniciar","En Curso","Finalizado","Reprogramado","Desistido","Suspendido"]
                          .includes(solicitud.estadosTramites?.[0]?.estado?.nombreEstado ?? "")
                      }
                    )}
                  >
                    {solicitud.estadosTramites?.[0]?.estado?.nombreEstado ?? "Sin Iniciar"}
                  </div>

                  <SolicitudTramiteMenu solicitudId={solicitud.id} />
                </div>
              </li>
            ))}

            <EliminarSolicitudTramiteModal />
          </ul>

          {/* 🔹 Controles de paginación */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => cambiarPagina(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              ← Anterior
            </button>

            <span className="font-semibold">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => cambiarPagina(currentPage + 1)}
              disabled={currentPage === totalPages}
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
