"use client"

import { Textarea } from "@headlessui/react"
import MunicipiosComboBox from "../municipios/municipiosCombobox"
import { useActionState, useEffect } from "react"
import { useFormState } from "react-dom"
import { crearSolicitud } from "@/actions/crear-Solicitud-action"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import ClientesComboBox from "../clientes/clientesCombobox"



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
         },
         onClick:()=>{
            router.push('/center')
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
      

      <div className="space-y-3">
          <label htmlFor="name" className="text-sm uppercase font-bold">
              Detalle Solicitud
          </label>
          <textarea
              id="datelleSolicitud"
              className="w-full p-3  border border-gray-100 bg-slate-100" rows={5}
              
              placeholder="Nombre del Presupuesto"
              name="detalleSolicitud"
         ></textarea>
      </div>
      <div className="space-y-3">
          <label htmlFor="direccionTramite" className="text-sm uppercase font-bold">
              Direccion Tramite
          </label>
          <input
              type="text"
              id="direccionTramite"
              className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
              placeholder="Direccion a realizar el trámite"
              name="direccionTramite"
              
          />
      </div>
       <div className="space-y-3">
          <label htmlFor="municipioId" className="text-sm uppercase font-bold">
              Municipio
          </label>
          
          <MunicipiosComboBox name="municipioId"/>
      </div>
       <div className="space-y-3">
          <label htmlFor="clienteId" className="text-sm uppercase font-bold">
              Cliente
          </label>
          
          <ClientesComboBox name="clienteId"/>
      </div>
      <input
        type="submit"
        className="bg-blue-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Solicitud'
      />
    </form>
  )
}