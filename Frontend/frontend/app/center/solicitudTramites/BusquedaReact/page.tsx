import { SolicitudesAPIRespuestaSchema } from "@/src/schemas"
import CenterPageClient from "@/components/solicitudTramites/CenterPageClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nodex - Inicio",
}





const getSolicitudes = async (page = 1) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitudTramites?page=${page}`
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al cargar solicitudes")

  const data = await res.json()
  return data // ⚠️ Debe devolver { data, totalPages, currentPage }
}

export default async function CenterPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page) || 1
  const result = await getSolicitudes(page)

  // 👇 protección si algo falla
  const solicitudes = result?.data ?? []
  const totalPaginas = result?.totalPages ?? 1

  return (
    <CenterPageClient
      solicitudes={solicitudes}
      paginaActual={page}
      totalPaginas={totalPaginas}
    />
  )
}
