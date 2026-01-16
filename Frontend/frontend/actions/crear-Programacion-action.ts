"use server"

import { ErrorResponoseSchema,SuccessSchema,  ProgramacionSchema } from "@/src/schemas"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"


type ActionStateType ={
    errors:string[],
    success:string
}



export default async function CrearProgramacion(solicitudTramitesId:number,prevState:ActionStateType,formData:FormData) {
    const programacionData={
        solicitudTramitesId:solicitudTramitesId, 
        fechaProbableEntrega:formData.get('fechaProbableEntrega'),
        
        

    }
    
    const programacion=ProgramacionSchema.safeParse(programacionData)

    if(!programacion.success){
        return{
            errors:programacion.error.issues.map(issue=>issue.message),
            success:''
        }
    }

    const token = cookies().get("TOKEN")?.value
    // Generar Trazabilidad
    const url =`${process.env.API_URL}/solicitudTramites/${solicitudTramitesId}/programacion`
    const req =await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
          
        },
        body:JSON.stringify({
            solicitudTramitesId:solicitudTramitesId,
           
            fechaProbableEntrega:programacionData.fechaProbableEntrega,
           
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
    
    revalidatePath(`/center/solicitudTramites/${solicitudTramitesId}`)
    const success = SuccessSchema.parse(json)

    return{
        errors:[],
        success
    }
    
}
