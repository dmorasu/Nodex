"use client"
import { SolicitudTramites } from '@/src/schemas'
import SolicitudTramitesForm from './SolicitudTramitesForm'

export default function EditarSolicitudTramiteForm({solicitud}:{solicitud:SolicitudTramites}) {
  return (
     <form
          className="mt-10 space-y-3  "
          noValidate
          action={()=>{}}
        >
           
    
          <SolicitudTramitesForm
            solicitud={solicitud}
            
          
          />
          <input
            type="submit"
            className="bg-blue-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
            value='Guardar'
          />
        </form>
  )
}
