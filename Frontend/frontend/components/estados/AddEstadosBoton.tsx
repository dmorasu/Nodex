"use client"
import { useRouter } from "next/navigation"

export default function AddEstadosBoton() {

    const router =useRouter()
  return (
    <button
        type="button"
        className="bg-orange-400 px-10 py-2 rounded-lg text-white font-bold cursor-pointer"
        onClick={()=>router.push(location.pathname+'?addEstado=true&showModal=true')}
      
    >Estado</button>
  )
}
