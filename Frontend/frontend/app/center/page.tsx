
import MunicipiosComboBox from "@/components/municipios/municipiosCombobox";
import Link from "next/link";
import {Metadata} from 'next'

export const metadata:Metadata={
    title:'Nodex - Inicio'

}

export default async function CenterPage() {



    
    return (
        <>
            <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
                <div className="w-full md:w-auto">
                    <h1 className="font-black text-4xl text-gray-900 my-5">
                        Solicitudes Creadas
                    </h1>
                    <p className="text-xl font-bold">
                        Tienes los siguientes {""}
                        <span className="text-blue-600"> Trámites:</span>
                    </p>
                    

                
                </div>
                <Link
                    href={"/center/solicitudesTramites/nueva"}
                    className="bg-orange-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
                >
                    Crear Trámite
                </Link>
            </div>
        </>
    );
}
