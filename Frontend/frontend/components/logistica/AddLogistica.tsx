"use client"
import { useRouter } from "next/navigation"

export default function AddLogisticatoBoton(){
    const router =useRouter()

    return(
          <button 
            type="button"
                className="
                    px-4 py-2
                    hover:border border-sky-400
                  text-white
                    rounded-md
                    font-medium
                    transition-all
                  hover:bg-white hover:text-sky-400
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                  bg-sky-400"
            onClick={()=>router.push(location.pathname+'?addLogistica=true&showModal=true')}
      
        >
            Logistica

        </button>
    )

}
    
        
