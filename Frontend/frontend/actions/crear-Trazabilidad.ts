"use server"

import { ErrorResponoseSchema,TrazabilidadSchema,SuccessSchema } from "@/src/schemas"


type ActionStateType ={
    errors:string[],
    success:string
}

export default async function CrearTrazabilidad(solicitudTramitesId:number,prevState:ActionStateType,formData:FormData) {
    const estadoTramiteData={
        solicitudTramitesId:solicitudTramitesId, 
        observacionTrazabilidad:formData.get('observacionTrazabilidad')
    }
    
    const trazabilidad=TrazabilidadSchema.safeParse(estadoTramiteData)

    if(!trazabilidad.success){
        return{
            errors:trazabilidad.error.issues.map(issue=>issue.message),
            success:''
        }
    }

    // Generar Trazabilidad
    const url =`${process.env.API_URL}/solicitudTramites/${solicitudTramitesId}/trazabilidad`
    const req =await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            solicitudTramitesId:solicitudTramitesId
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