


export function formatoFecha(isoString?: string | null) {
  if (!isoString) return "Sin fecha";

  const fecha = new Date(isoString);

  if (isNaN(fecha.getTime())) {
    return "Sin fecha";
  }

  const formatear = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return formatear.format(fecha);
}


export function toDateInput(value?: string | null) {
  if (!value) return ""
  return value.split("T")[0]   // "2026-02-13"
}