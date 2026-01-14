import { DialogTitle } from "@headlessui/react";

import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";

import { toast } from "react-toastify";
import CrearLogistica from "@/actions/crear-logistica-action";


export default function AddLogisticaForm({closeModal}:{closeModal:()=>void}){
    const {id}=useParams()

    const crearLogisticaconId=CrearLogistica.bind(null,+id)

    const [state,distpach]=useFormState(crearLogisticaconId,{
        errors:[],
        success:""
    })
    useEffect(()=>{
        if(state.success){
          toast.success(state.success)
          closeModal()
        }
      },[state])
      return (
        <>
          <DialogTitle
            as="h3"
            className="font-black text-4xl text-sky-400 my-5"
          >
             Programación Logistica 
          </DialogTitle>
    
          <p className="text-xl font-bold"> {''}
            <span className="text-sky-400">Trámite</span>
          </p>
          {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
         <form
  className="shadow-lg rounded-lg p-10 mt-10 border"
  noValidate
  action={distpach}
>
  
  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Número de Guía:
    </label>
    <input
      type="text"
      name="numeroGuia"
      className="w-full p-3 border border-gray-100 bg-slate-100"
      placeholder="Ingrese número de guía"
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Valor del Envío:
    </label>
    <input
      type="number"
      name="valorEnvio"
      className="w-full p-3 border border-gray-100 bg-slate-100"
      placeholder="Valor del envío"
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Hora Programada:
    </label>
    <input
      type="time"
      name="horaProgramada"
      className="w-full p-3 border border-gray-100 bg-slate-100"
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Fecha de Programación:
    </label>
    <input
      type="date"
      name="fechaProgramacionLogistica"
      className="w-full p-3 border border-gray-100 bg-slate-100"
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Fecha de Entrega Transportadora:
    </label>
    <input
      type="date"
      name="fechaEntregaTransportadora"
      className="w-full p-3 border border-gray-100 bg-slate-100"
    />
  </div>

  <input
    type="submit"
    className="bg-sky-400 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
    value="Agregar"
  />
</form>

        </>
      )

  
}