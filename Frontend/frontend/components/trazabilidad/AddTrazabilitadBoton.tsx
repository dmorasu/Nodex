"use client"
import { useRouter } from "next/navigation"

export default function AddTrazabilidadBoton(){
    const router =useRouter()

    return(
          <button 
            type="button"
            className="bg-gray-400 px-10 py-2 rounded-lg text-white font-bold cursor-pointer"
            onClick={()=>router.push(location.pathname+'?addTrazabilidad=true&showModal=true')}
      
        >
            Trazabilidad

        </button>
    )


    
        

    
}