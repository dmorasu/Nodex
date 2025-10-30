import AddEstadosBoton from '@/components/estados/AddEstadosBoton';
import ModalContainer from '@/components/ui/ModalContainer';
import { SolicitudAPIRespuestaSchema } from '@/src/schemas'
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

export default  async function DetalleSolicitudTramite({params}:{params:{id:string}}) {
   
const solicitudTramiteId= params.id
const url = `${process.env.API_URL}/solicitudTramites/${solicitudTramiteId}`
const req =await fetch(url,{
    cache: 'no-store',

  })
  const json =await req.json()
  const solicitudTramite= SolicitudAPIRespuestaSchema.parse(json)
  console.log(json)
  return (
    <>
        <div className='flex justify-between items-center'>
            <div>
                 <h1 className="font-black text-4xl text-sky-400">Trámite N: {solicitudTramite.id}</h1>
                    
            </div>
            <AddEstadosBoton/>
            
        </div>
        <ModalContainer/>
        
      
    </>
  )
}
