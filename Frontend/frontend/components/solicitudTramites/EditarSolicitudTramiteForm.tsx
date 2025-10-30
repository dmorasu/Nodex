"use client"
import { SolicitudTramites } from '@/src/schemas'
import SolicitudTramitesForm from './SolicitudTramitesForm'
import { useFormState } from 'react-dom'
import { EditarSolicitudTramite } from '@/actions/editar-Solicitud-action'
import { success } from 'zod'
import ErrorMessage from '../ui/ErrorMessage'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function EditarSolicitudTramiteForm({solicitud}:{solicitud:SolicitudTramites}) {
  
  const router = useRouter()
  const  editarSolicitudTramiteid =EditarSolicitudTramite.bind(null,solicitud.id)
  const [state,dispatch] = useFormState(editarSolicitudTramiteid,{
    errors:[],
    success:''

  })

  useEffect(()=>{
    if(state.success){
      toast.success(state.success)
      router.push('/center')
    }


  },[state])
  
  return (
     <form
          className="mt-10 space-y-3  "
          noValidate
          action={dispatch}
        >
           
          {state.errors?.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
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
