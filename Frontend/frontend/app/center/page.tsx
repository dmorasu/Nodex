import { SolicitudesAPIRespuestaSchema } from "@/src/schemas"
import CenterPageClient from "@/components/solicitudTramites/CenterPageClient"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Nodex - Inicio",
}

// 🔹 Carga de solicitudes en el servidor
async function getAllSolicitudes() {
  const url = `${process.env.API_URL}/solicitudTramites`
  const req = await fetch(url, { cache: "no-store" })
  const json = await req.json()
  const solicitudes = SolicitudesAPIRespuestaSchema.parse(json)
  //console.log(solicitudes[0].estadosTramites)
  return solicitudes
}



export default async function CenterPage() {
  const solicitudes = await getAllSolicitudes()

  return <CenterPageClient solicitudes={solicitudes} />
}
