


export function formatoFecha(isoString?: string | null) {
  if (!isoString) return "Sin fecha";

  const fecha = new Date(isoString);

  const fechaTexto = fecha.toLocaleDateString("es-CO", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return fechaTexto;
}
export function toDateInput(value?: string | null) {
  if (!value) return ""
  return value.split("T")[0]   // "2026-02-13"
}

export function formatoFechaFinaizacion(isoString?: string | null) {
  if (!isoString) return "Trámite sin Finalizar";

  const fecha = new Date(isoString);

  if (isNaN(fecha.getTime())) {
    return "Trámite sin Finalizar";
  }

  const opcionesFecha = {
    timeZone: "America/Bogota",
    day: "numeric" as const,
    month: "long" as const,
    year: "numeric" as const,
  };

  const opcionesHora = {
    timeZone: "America/Bogota",
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    hour12: false,
  };

  const fechaTexto = fecha.toLocaleDateString("es-CO", opcionesFecha);

  const horaTexto = fecha
    .toLocaleTimeString("es-CO", opcionesHora)
    .replace("a. m.", "a.m.")
    .replace("p. m.", "p.m.");

  return `${fechaTexto}, ${horaTexto}`;
}

export function formatoMoneda(
  valor?: number | string | null,
  mostrarCentavos: boolean = false
) {
  if (valor === null || valor === undefined || valor === "") {
    return "$0";
  }

  const numero = Number(valor);

  if (isNaN(numero)) {
    return "$0";
  }

  return numero.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: mostrarCentavos ? 2 : 0,
    maximumFractionDigits: mostrarCentavos ? 2 : 0,
  });
}

export function formatoFechaSinZona(isoString?: string | null) {
  if (!isoString) return "Sin fecha";

  // 🔥 Extraemos solo la parte de fecha (YYYY-MM-DD)
  const soloFecha = isoString.split("T")[0];

  const [year, month, day] = soloFecha.split("-");

  const fecha = new Date(Number(year), Number(month) - 1, Number(day));

  return fecha.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}