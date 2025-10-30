"use server"

import { ErrorResponoseSchema, EstadoTramitesSchema, SuccessSchema } from "@/src/schemas"


type ActionStateType ={
    errors:string[],
    success:string
}

export default  async function CrearEstadoTramite(solicitudTramiteId:number,prevState:ActionStateType,formData:FormData) {
    const estadoTramiteData={
        estadoId:formData.get('estadoId'),
        solicitudTramitesId:solicitudTramiteId

    }
    
    const estadoTramite=EstadoTramitesSchema.safeParse(estadoTramiteData)

    if(!estadoTramite.success){
        return{
            errors:estadoTramite.error.issues.map(issue=>issue.message),
            success:''
        }
    }

    //Generar Estado de Tramites
    const url =`${process.env.API_URL}/solicitudTramites/${solicitudTramiteId}/estadosTramites`
    const req =await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            estadoId:estadoTramite.data.estadoId,
            solicitudTramiteId:solicitudTramiteId
            
            
        })
    })

    const json =await req.json()
    console.log(json)
    if(!req.ok){
        const {error}=ErrorResponoseSchema.parse(json)
        return{
            errors:[error],
            success:''
        }
    }
    
    const success = SuccessSchema.parse(json)

    return{
        errors:[],
        success
    }
    
}