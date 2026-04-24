import XLSX from 'xlsx'

export const generarPlantillaTrazabilidad = async () => {

  const wb = XLSX.utils.book_new()

  const dataTemplate = [{
    solicitudTramiteId: '',
    observacionTrazabilidad: '',
    nombreUsuario: ''
  }]

  const ws = XLSX.utils.json_to_sheet(dataTemplate)

  XLSX.utils.book_append_sheet(wb, ws, 'DATA')

  return XLSX.write(wb, {
    type: 'buffer',
    bookType: 'xlsx'
  })
}