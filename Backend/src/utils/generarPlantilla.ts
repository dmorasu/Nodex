import XLSX from 'xlsx'
import Estados from '../models/estados'
import Tramitador from '../models/tramitador'
import Transportadora from '../models/trasnportadora'

export const generarPlantilla = async (tipo: string) => {

  const wb = XLSX.utils.book_new()

  let dataTemplate: any[] = []

  // =========================
  // SEGÚN TIPO
  // =========================
  switch (tipo) {

    case 'estados':
      dataTemplate = [{
        solicitudTramiteId: '',
        estadoId: '',
        fechaEstado: ''
      }]
      break

    case 'programacion':
      dataTemplate = [{
        solicitudTramiteId: '',
        fechaRealizacionDiligencia: '',
        valorTramite: ''
      }]
      break

    case 'tramitador':
      dataTemplate = [{
        solicitudTramiteId: '',
        tramitadorId: ''
      }]
      break

    case 'trazabilidad':
      dataTemplate = [{
        solicitudTramiteId: '',
        comentario: ''
      }]
      break

    case 'logistica':
      dataTemplate = [{
        solicitudTramiteId: '',
        transportadoraId: '',
        numeroGuia: ''
      }]
      break

    default:
      throw new Error('Tipo de plantilla no válido')
  }

  // =========================
  // HOJA DATA
  // =========================
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(dataTemplate),
    'DATA'
  )

  // =========================
  // HOJAS DE AYUDA
  // =========================

  const estados = await Estados.findAll()
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(estados.map(e => ({
      id: e.id,
      nombre: e.nombreEstado
    }))),
    'ESTADOS'
  )

  const tramitadores = await Tramitador.findAll()
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(tramitadores.map(t => ({
      id: t.id,
      nombre: t.nombreTramitador
    }))),
    'TRAMITADORES'
  )

  const transportadoras = await Transportadora.findAll()
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(transportadoras.map(t => ({
      id: t.id,
      nombre: t.nombreTransportadora
    }))),
    'TRANSPORTADORAS'
  )

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
}
