import XLSX from 'xlsx'
import Tramitador from '../models/tramitador'

export const generarPlantillaTramitador = async () => {

  const wb = XLSX.utils.book_new()

  // DATA
  const dataTemplate = [{
    solicitudTramiteId: '',
    tramitadorId: ''
  }]

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(dataTemplate),
    'DATA'
  )

  // HOJA AYUDA
  const tramitadores = await Tramitador.findAll()

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet(
      tramitadores.map(t => {
        const json = t.toJSON()
        return {
          id: json.id,
          nombre: json.nombreTramitador
        }
      })
    ),
    'TRAMITADORES'
  )

  return XLSX.write(wb, {
    type: 'buffer',
    bookType: 'xlsx'
  })
}