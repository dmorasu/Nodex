"use server"

import { ErrorResponoseSchema,TrazabilidadSchema,SuccessSchema, CuentaCobroSchema } from "@/src/schemas"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { error } from "console"
import { success } from "zod"

type ActionStateType ={
    errors:string[],
    success:string
}


export default async function CrearCuentaCobro(solicitudTramitesId:number,prevState:ActionStateType,formData:FormData) {
    const cuentaCobroData={
        solicitudTramitesId:solicitudTramitesId,
        fechaRadicacionCuentaCobro:formData.get('fechaRadicacionCuentaCobro'),
        fechaRecibidaCuentaCobroTramitador:formData.get('fechaRecibidaCuentaCobroTramitador'),
        fechaMaximaPagoCuentaCobro:formData.get('fechaMaximaPagoCuentaCobro'),
        fechaPagoCuentaCobro:formData.get('fechaPagoCuentaCobro'),
        numeroCuentaCobro:formData.get('numeroCuentaCobro')

    }

    const cuentaCobro=CuentaCobroSchema.safeParse(cuentaCobroData)
    if(!cuentaCobro.success){
        return{
            errors:cuentaCobro.error.issues.map(issue=>issue.message),
            success:''
        }
    }

    const url= `${process.env.API_URL}/solicitudesTramites/${solicitudTramitesId}/cuentaCobro`
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            solicitudTramitesId:solicitudTramitesId,
            fechaRadicacionCuentaCobro:cuentaCobroData.fechaRadicacionCuentaCobro,
            fechaMaximaPagoCuentaCobro:cuentaCobroData.fechaMaximaPagoCuentaCobro,
            fechaRecibidaCuentaCobroTramitador:cuentaCobroData.fechaRecibidaCuentaCobroTramitador,
            fechaPagoCuentaCobro:cuentaCobroData.fechaPagoCuentaCobro,
            numeroCuentaCobro:cuentaCobroData.numeroCuentaCobro
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