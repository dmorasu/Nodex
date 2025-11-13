"use client"

import { Textarea } from "@headlessui/react"
import MunicipiosComboBox from "../municipios/municipiosCombobox"
import { useActionState, useEffect } from "react"
import { useFormState } from "react-dom"
import { crearSolicitud } from "@/actions/crear-Solicitud-action"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import ClientesComboBox from "../clientes/clientesCombobox"
import ClientesForm from "./clientesForm"



export default function CrearSolicitudesForm() {
  const router =useRouter()
  const[state,dispatch] =useFormState(crearSolicitud,{
    errors:[],
    success:''
  })

  useEffect(()=>{
    if(state.errors){
       state.errors.forEach(error =>{
            toast.error(error)
       })
    }

    if(state.success){
       toast.success(state.success,{
         autoClose:1200,
         onClose:()=>{
            router.push('/center')
            router.refresh()
         },
         onClick:()=>{
            router.push('/center')
            router.refresh()
         }

       })
    }
    

  },[state])
  


  return (
    <form
      className="mt-10 space-y-3  "
      noValidate
      action={dispatch}
    >
       

      <ClientesForm/>
      <input
        type="submit"
        className="bg-blue-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Cliente'
      />
    </form>
  )
}