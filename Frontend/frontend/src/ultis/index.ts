


export function formatoFecha(isoString:string){
    const fecha = new Date(isoString)
    const fromatear =new  Intl.DateTimeFormat('es-ES',{
        year:'numeric',
        month:'long',
        day:'2-digit'
    })

    return fromatear.format(fecha)

}


export function toDateInput(value?: string | null) {
  if (!value) return ""
  return value.split("T")[0]   // "2026-02-13"
}