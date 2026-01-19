import AddCuentaCobroBoton from '@/components/cuentacobro/AddCuentaCobroBoton';
import AddEstadosBoton from '@/components/estados/AddEstadosBoton';
import AddLogisticatoBoton from '@/components/logistica/AddLogistica';

import AddProgramacionBoton from '@/components/programacion/AddProgramacionBoton';
import AddTrazabilidadBoton from '@/components/trazabilidad/AddTrazabilitadBoton';

import dynamic from "next/dynamic";
import { SolicitudAPIRespuestaSchema } from '@/src/schemas'
import { formatoFecha } from '@/src/ultis';
import { Metadata } from 'next'
import Link from 'next/link';
import React from 'react'
import clsx from "clsx"


const ModalContainer = dynamic(
  () => import('@/components/ui/ModalContainer'),
  { ssr: false }
);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // 1️⃣ Primero obtener los datos de la solicitud
  const res = await fetch(`${process.env.API_URL}/solicitudTramites/${params.id}`);

  if (!res.ok) {
    return {
      title: "Solicitud no encontrada",
    };
  }

  const data = await res.json();

  // 2️⃣ Validar la respuesta con el esquema Zod
  const solicitud = SolicitudAPIRespuestaSchema.parse(data);

  // 3️⃣ Devolver los metadatos
  return {
    title: `Nodex - ${solicitud.id}`,
    description: solicitud.detalleSolicitud,
  };
}



export default async function DetalleSolicitudTramite({ params }: { params: { id: string } }) {

  const solicitudTramiteId = params.id
  const url = `${process.env.API_URL}/solicitudTramites/${solicitudTramiteId}`
  const req = await fetch(url, {
    cache: 'no-store',

  })
  const json = await req.json()
  const solicitudTramite = SolicitudAPIRespuestaSchema.parse(json)
  //console.log(solicitudTramite)
  return (
    <>
      <div className=' bg-white  border-slate-200 rounded-lg  px-6 py-4 flex justify-between items-center divide-gray-300 border shadow-lg mt-10'>
        
        <div>
          <h1 className="  text-2xl font-semibold text-slate-800">Trámite N: {solicitudTramite.id}</h1>
         
        </div>
        <div className="flex items-center gap-3">
          <AddEstadosBoton />
          <AddProgramacionBoton />
          <AddLogisticatoBoton/>
          <AddCuentaCobroBoton/>
          <AddTrazabilidadBoton/>
          <Link
           href={'/center'}
             className="
              px-4 py-2
            hover:bg-white
            hover:text-slate-600
              hover:border border-red-400
              rounded-md
              font-medium
            bg-red-400
            text-slate-50
              transition
      "
        >
          Volver
        </Link>

        </div>
        

      </div>
      <>  
          
          <div>
             <h4 className=' text-2xl text-orage-400 mt-10 text-center'>
            Detalle de la Solicitud:
          </h4>
          </div>
          <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
              
              <li key={solicitudTramite.id} className="flex justify-center gap-x-6 p-5 ">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2"> 
                    <p className="text-lg font-semibold leading-6 text-gray-900">
                        <span className="text-black">Cliente:</span>{" "}
                        {solicitudTramite.clientes?.nombreCliente}
                    </p>
                    <p className="text-base  leading-6 text-gray-900">
                        <span className="text-black font-bold ">Detalle: </span>{" "}
                        <span className='text-justify'>{solicitudTramite.detalleSolicitud}</span>
                    </p>
                    
                    
                     <p className='text-gray-500  text-sm'>
                        <span className="text-black font-bold">Placa:</span>{" "}
                        <span className='text-justify'> {solicitudTramite.placa}</span>
                    </p>
                     <p className='text-gray-500  text-sm'>
                        <span className="text-black font-bold">Matricula Inmobiliaria:</span>{" "}
                        <span className='text-justify'>{solicitudTramite.matriculaInmobiliaria}</span>
                    </p>
                     <p className='text-gray-500  text-sm'>
                        <span className="text-orange-500">Fecha Posible Entrega:</span>{" "}
                        {solicitudTramite.fechaEntregaResultado && formatoFecha(solicitudTramite.fechaEntregaResultado)}

                    </p>
                     <p className='text-gray-500  text-sm'>
                        
                        <span className="text-orange-500">Centro de Costos:</span>{" "}
                        {solicitudTramite.centroCostos}
                    </p>
                    <p className="text-sm font-bold text-sky-400">
                         
                    </p>
                    <p className='text-gray-500  text-sm'>
                        {solicitudTramite.municipios?.nombreMunicipio}, 

                        <span className="text-orange-500">direccion:</span>{" "}
                        {solicitudTramite.direccionTramite} 
                    </p>
                    
                     <p className='text-gray-500  text-sm'>
                        

                        <span className="text-orange-500">Fecha Probable Entrega:</span>{" "}
                        {formatoFecha(solicitudTramite.programacion?.fechaProbableEntrega??"Sin Fecha ")} 
                    </p>
                    {/* <p
                                        className={clsx(
                                          "p-2 rounded-lg font-bold w-full md:w-auto text-center",
                                          {
                                            "bg-red-400 text-white":
                                              solicitudTramite.estadosTramites?.[0]?.estado?.nombreEstado === "Sin Iniciar",
                                            "bg-amber-400 text-white":
                                              solicitudTramite.estadosTramites?.[0]?.estado?.nombreEstado === "En Curso",
                                            "bg-green-500 text-white":
                                              solicitudTramite.estadosTramites?.[0]?.estado?.nombreEstado === "Finalizado",
                                            "bg-blue-500 text-white":
                                              solicitudTramite.estadosTramites?.[0]?.estado?.nombreEstado === "Reprogramado",
                                            "bg-orange-500 text-white":
                                              solicitudTramite.estadosTramites?.[0]?.estado?.nombreEstado === "Desistido",
                                            "bg-purple-500 text-white":
                                              solicitudTramite.estadosTramites?.[0]?.estado?.nombreEstado === "Suspendido",
                                            "bg-gray-400 text-white":
                                              !["Sin Iniciar","En Curso","Finalizado","Reprogramado","Desistido","Suspendido"]
                                              .includes(solicitudTramite.estadosTramites?.[0]?.estado?.nombreEstado ?? "")
                                          }
                                        )}
                                      >
                                        {solicitudTramite.estadosTramites?.[0]?.estado?.nombreEstado ?? "Sin Iniciar"}
                                      </p> */}
                    <p className="text-gray-400 text-sm">
                      Actualizado el:{" "}
                      <span className="font-bold">
                  {formatoFecha(solicitudTramite.updatedAt)}
                </span>
              </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">

                </div>
              </li>
            
          </ul>
        </>
      {solicitudTramite.trazabilidad?.length ? (
        <>


          

          
         



          <h6 className='text-2xl text-orage-400 mt-10 text-center'>
            Historial de Trazabilidad:
          </h6>

          <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
            {solicitudTramite.trazabilidad.map((solicitudTramite) => (
              <li key={solicitudTramite.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-base font-semibold ">
                      {solicitudTramite.observacionTrazabilidad}
                    </p>
                    <span className="text-orange-500">Creado por :</span>{" "}
                        {solicitudTramite.nombreUsuario} 
                    <p className="text-sm font-bold text-sky-400">
                      {formatoFecha(solicitudTramite.createdAt)}

                    </p>
                    <p className='text-gray-500  text-sm'>

                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>


        </>
      ) : (
        


        <p className='text-center py-20'> No se han registrado observaciones en la Trazabilidad</p>
        
      )}
      <ModalContainer solicitudTramite={solicitudTramite} />


    </>
  )
}
