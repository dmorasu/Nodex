import XLSX from 'xlsx'

export const parseExcel = (buffer: Buffer) => {
  const workbook = XLSX.read(buffer, { type: 'buffer' })

  const hoja = workbook.Sheets['DATA']

  if (!hoja) {
    throw new Error('La hoja debe llamarse DATA')
  }

  return XLSX.utils.sheet_to_json(hoja)
}