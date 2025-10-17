"use client"

import { Textarea } from "@headlessui/react"
import MunicipiosComboBox from "../municipios/municipiosCombobox"



export default function CrearSolicitudesForm() {


  return (
    <form
      className="mt-10 space-y-3  "
      noValidate
    >
      <div className="space-y-3">
          <label htmlFor="name" className="text-sm uppercase font-bold">
              Detalle Solicitud
          </label>
          <textarea
              id="name"
              className="w-full p-3  border border-gray-100 bg-slate-100" rows={5}
              
              placeholder="Nombre del Presupuesto"
              name="name"
         ></textarea>
      </div>
      <div className="space-y-3">
          <label htmlFor="amount" className="text-sm uppercase font-bold">
              Direccion Diligencia
          </label>
          <input
              type="text"
              id="amount"
              className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
              placeholder="Direccion a realizar el trámite"
              name="amount"
              required
          />
      </div>
       <div className="space-y-3">
          <label htmlFor="amount" className="text-sm uppercase font-bold">
              Municipio
          </label>
          
          <MunicipiosComboBox />
      </div>
      <input
        type="submit"
        className="bg-blue-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Solicitud'
      />
    </form>
  )
}