

import Link from "next/link";
import { Metadata } from 'next'
import { SolicitudesAPIRespuestaSchema } from "@/src/schemas";
import { formatoFecha } from "@/src/ultis";
import SolicitudTramiteMenu from "@/components/solicitudTramites/MenuSolicitudTramites";

export const metadata: Metadata = {
    title: 'Nodex - Inicio'

}
async function getAllSolicitudes() {

    const url = `${process.env.API_URL}/solicitudTramites`

    const req = await fetch(url, { cache: 'no-store' })
    const json = await req.json()
    const solicitudes = SolicitudesAPIRespuestaSchema.parse(json)
    console.log(solicitudes)
    return solicitudes
}

export default async function CenterPage() {



    const solicitudes = await getAllSolicitudes()
    return (
        <>
            <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
                <div className="w-full md:w-auto">
                    <h1 className="font-black text-4xl text-gray-900 my-5">
                        Solicitudes Creadas
                    </h1>
                    <p className="text-xl font-bold">
                        Tienes los siguientes {""}
                        <span className="text-sky-500"> Trámites:</span>
                    </p>



                </div>
                <Link
                    href={"/center/solicitudesTramites/nueva"}
                    className="bg-gray-400 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
                >
                    Crear Trámite
                </Link>


            </div>

            {solicitudes.length ? (
                <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10  bg-white p-4  shadow-blue-400 ">
                    {solicitudes.map((solicitudes) => (
                        <li key={solicitudes.id} className="flex justify-between gap-x-6 p-5 ">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        <Link
                                            href={`/center/solicitudesTramites/${solicitudes.id}`}
                                            className="cursor-pointer hover:underline text-lg font-bold"
                                        >
                                           <span className="text-sky-500">ST</span> : {solicitudes.id}
                                        </Link>
                                    </p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        <Link
                                            href={`/center/solicitudesTramites/${solicitudes.id}`}
                                            className="cursor-pointer hover:underline text-lg font-bold"
                                        >
                                           <span className="text-sky-500">Cliente</span>: {solicitudes.clientes?.nombreCliente}
                                        </Link>
                                    </p>
                                    <p className="text-base font-bold text--500">
                                        {solicitudes.municipios?.nombreMunicipio}

                                    </p>
                                    <p className="text-base  text--500">
                                        {solicitudes.detalleSolicitud}

                                    </p>
                                    <p className='text-gray-400  text-sm'>
                                        Actualizado el:{''}
                                        <span className="font-bold">{formatoFecha(solicitudes.updatedAt) }</span>

                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <SolicitudTramiteMenu
                                        solicitudId={solicitudes.id}
                                />
                                    
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center py-20">
                    No hay solicitudes de Tramites{''}
                    <Link
                        href={"/center/solicitudesTramites/nueva"}
                        className="bg-orange-500  text-white font-bold "
                    >
                        Crea una solicitud
                    </Link>
                </p>
            )}
        </>
    );
}
