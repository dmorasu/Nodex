import EditarSolicitudTramiteForm from "@/components/solicitudTramites/EditarSolicitudTramiteForm"
import { SolicitudAPIRespuestaSchema } from "@/src/schemas"
import Link from "next/link"
import { notFound } from "next/navigation"



const getSolicitudTramites = async (solicitudTramiteId:string)=>{
  const url = `${process.env.API_URL}/solicitudTramites/${solicitudTramiteId}`
  const req =await fetch(url,{
    cache: 'no-store',

  })
  const json =await req.json()
 
 
  const solicitud= SolicitudAPIRespuestaSchema.parse(json)
  console.log(json)
  return solicitud
}

export default  async function EditarSolicitudTramitePage({params}:{params:{id:string}}) {
  const id= params.id

  const solicitud =await getSolicitudTramites(id)

  return (
     <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-sky-400 my-5'>
            Editar Solicitud de Trámite: {solicitud.id}
          </h1>
          <p className="text-xl font-bold">Modifique los datos de la {''}
            <span className="text-amber-500">Solicitud:</span>
          </p>
        </div>
        <Link
          href={'/center'}
          className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>
      <div className='p-10 mt-10  shadow-lg border '>
          <EditarSolicitudTramiteForm
              solicitud={solicitud}
          />
      </div>
    </>
  )
}
