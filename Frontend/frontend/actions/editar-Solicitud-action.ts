"use server"

import { CrearSolicitudSchema, ErrorResponoseSchema, SolicitudTramites, SuccessSchema } from "@/src/schemas"
import { error } from "console"
import { revalidatePath } from "next/cache"
import { Solitreo } from "next/font/google"
import { success } from "zod"

type ActiosStateType={
    errors:string[],
    success:string
}


export async function EditarSolicitudTramite(solicitudTramiteId: SolicitudTramites['id'], prevState:ActiosStateType, formData:FormData) {
  
   const solicitudTramiteData={
         detalleSolicitud: formData.get('detalleSolicitud'),
        direccionTramite: formData.get('direccionTramite'),
        municipiosId:formData.get('municipioId'),
        clienteId:formData.get('clienteId'),
        operacionesId:formData.get('operacionId'),
        tipoServicio:formData.get('tipoServicio'),
       
        fechaEntregaResultado:formData.get('fechaEntregaResultado'),
        placa:formData.get('placa'),
        matriculaInmobiliaria:formData.get('matricula'),
        centroCostos:formData.get('centroCostos'),
        usuarioId:formData.get('usuarioId')
   }

   const solicitudTramite = CrearSolicitudSchema.safeParse(solicitudTramiteData)

   if(!solicitudTramite.success){
        return{
            errors:solicitudTramite.error.issues.map(issue=>issue.message),
            success:''
        }
   }

   const url=`${process.env.API_URL}/solicitudTramites/${solicitudTramiteId}`
   const req = await fetch(url,{
    method:'PUT',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
         detalleSolicitud:solicitudTramiteData.detalleSolicitud,
              direccionTramite:solicitudTramiteData.direccionTramite,
              municipiosId:solicitudTramiteData.municipiosId,
              clienteId :solicitudTramiteData.clienteId,
              operacionesId:solicitudTramiteData.operacionesId,
              fechaEntregaResultado:solicitudTramiteData.fechaEntregaResultado,
              placa:solicitudTramiteData.placa,
              matriculaInmobiliaria:solicitudTramiteData.matriculaInmobiliaria,
              centroCostos:solicitudTramiteData.centroCostos,
              tipoServicio:solicitudTramiteData.tipoServicio,
              usuarioId:solicitudTramiteData.usuarioId
    })
   })

   const json =await req.json()
   if(!req.ok){
    const {error}=ErrorResponoseSchema.parse(json)
    return{
        errors:[error],
        success:''
    }
   }

   revalidatePath('/center')
   const success=SuccessSchema.parse(json)

    return {
        errors:[],
        success
    }
    
}