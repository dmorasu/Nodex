import SolicitudTramites from '../models/solicitudTramites'
import Estados from '../models/estados'
import Tramitador from '../models/tramitador'
import Transportadora from '../models/trasnportadora'

// ============================
// VALIDAR ESTADOS
// ============================
export const validarEstados = async (data: any[]) => {

  const errores: any[] = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const fila = i + 2

    if (!row.solicitudTramiteId) {
      errores.push({ fila, error: 'Falta solicitudTramiteId' })
      continue
    }

    if (!row.estadoId) {
      errores.push({ fila, error: 'Falta estadoId' })
      continue
    }

    const solicitud = await SolicitudTramites.findByPk(row.solicitudTramiteId)
    if (!solicitud) {
      errores.push({ fila, error: 'Solicitud no existe' })
    }

    const estado = await Estados.findByPk(row.estadoId)
    if (!estado) {
      errores.push({ fila, error: 'Estado no existe' })
    }
  }

  return errores
}

// ============================
// VALIDAR LOGISTICA
// ============================
export const validarLogistica = async (data: any[]) => {
  const errores: any[] = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const fila = i + 2

    const solicitud = await SolicitudTramites.findByPk(row.solicitudTramiteId)
    if (!solicitud) {
      errores.push({ fila, error: 'Solicitud no existe' })
    }

    if (row.transportadoraId) {
      const t = await Transportadora.findByPk(row.transportadoraId)
      if (!t) {
        errores.push({ fila, error: 'Transportadora no existe' })
      }
    }
  }

  return errores
}

// VALIDAR PROGRAMACION

export const validarProgramacion = async (data: any[]) => {

  const errores: any[] = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const fila = i + 2

    if (!row.solicitudTramiteId) {
      errores.push({ fila, error: 'Falta solicitudTramiteId' })
      continue
    }

    const solicitud = await SolicitudTramites.findByPk(row.solicitudTramiteId)

    if (!solicitud) {
      errores.push({ fila, error: 'Solicitud no existe' })
    }
  }

  return errores
}
export const validarTrazabilidad = async (data: any[]) => {

  const errores: any[] = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const fila = i + 2

    if (!row.solicitudTramiteId) {
      errores.push({ fila, error: 'Falta solicitudTramiteId' })
      continue
    }

    if (!row.observacionTrazabilidad) {
      errores.push({ fila, error: 'Comentario requerido' })
      continue
    }

    if (!row.nombreUsuario) {
      errores.push({ fila, error: 'nombre de usuario  requerido' })
      continue
    }

    const solicitud = await SolicitudTramites.findByPk(row.solicitudTramiteId)

    if (!solicitud) {
      errores.push({ fila, error: 'Solicitud no existe' })
    }
  }

  return errores
}

// VALIDAR TRAMITADOR

export const validarTramitador = async (data: any[]) => {

  const errores: any[] = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const fila = i + 2

    if (!row.solicitudTramiteId) {
      errores.push({ fila, error: 'Falta solicitudTramiteId' })
      continue
    }

    if (!row.tramitadorId) {
      errores.push({ fila, error: 'Falta tramitadorId' })
      continue
    }

    const solicitud = await SolicitudTramites.findByPk(row.solicitudTramiteId)
    if (!solicitud) {
      errores.push({ fila, error: 'Solicitud no existe' })
    }

    const tramitador = await Tramitador.findByPk(row.tramitadorId)
    if (!tramitador) {
      errores.push({ fila, error: 'Tramitador no existe' })
    }
  }

  return errores
}