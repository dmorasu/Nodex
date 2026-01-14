import { DialogTitle } from "@headlessui/react";

import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";

import { toast } from "react-toastify";

import CrearProgramacion from "@/actions/crear-Programacion-action";


export default function AddProgramacionForm({closeModal}:{closeModal:()=>void}){
    const {id}=useParams()

    const crearProgramacionId=CrearProgramacion.bind(null,+id)

    const [state,distpach]=useFormState(crearProgramacionId,{
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
             Programación 
          </DialogTitle>
    
          <p className="text-xl font-bold"> {''}
            <span className="text-sky-400">Trámite</span>
          </p>
          {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
         <form
  className="b shadow-lg rounded-lg p-10 mt-10 border"
  noValidate
  action={distpach}
>
  
  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Fecha Realización Diligencia:
    </label>
    <input
      type="date"
      name="fechaRealizacionDiligencia"
      className="w-full p-3 border border-gray-100 bg-slate-100"
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Fecha Probable de Entrega:
    </label>
    <input
      type="date"
      name="fechaProbableEntrega"
      className="w-full p-3 border border-gray-100 bg-slate-100"
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Fecha Finalización Servicio:
    </label>
    <input
      type="date"
      name="fechaFinalizacionServicio"
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