import AddEstadosBoton from '@/components/estados/AddEstadosBoton';
import AddTrazabilidadBoton from '@/components/trazabilidad/AddTrazabilitadBoton';
import ModalContainer from '@/components/ui/ModalContainer';
import { SolicitudAPIRespuestaSchema } from '@/src/schemas'
import { formatoFecha } from '@/src/ultis';
import { Metadata } from 'next'
import React from 'react'

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
  //console.log(solicitudTramite.tra)
  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="font-black text-4xl text-sky-400">Trámite N: {solicitudTramite.id}</h1>

        </div>
        <AddEstadosBoton />
        <AddTrazabilidadBoton/>

      </div>
      <>
          <h1 className='font-black text-3xl text-orage-400 mt-10'>
            Detalle de la Solicitud
          </h1>
          <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
            
              <li key={solicitudTramite.id} className="flex justify-center gap-x-6 p-5 ">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-xl font-semibold leading-6 text-gray-900">
                        <span className="text-orange-500">Cliente:</span>{" "}
                        {solicitudTramite.clientes?.nombreCliente}
                    </p>
                    <p className="text-sm  leading-6 text-gray-900">
                        <span className="text-orange-500">Detalle:</span>{" "}
                        {solicitudTramite.detalleSolicitud}
                    </p>
                    
                    
                     <p className='text-gray-500  text-sm'>
                        <span className="text-orange-500">Placa:</span>{" "}
                        {solicitudTramite.placa}
                    </p>
                     <p className='text-gray-500  text-sm'>
                        <span className="text-orange-500">Matricula Inmobiliaria:</span>{" "}
                        {solicitudTramite.matriculaInmobiliaria}
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


          

          
         



          <h6 className='font-black text-2xl text-orage-400 mt-10'>
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
      <ModalContainer />


    </>
  )
}
