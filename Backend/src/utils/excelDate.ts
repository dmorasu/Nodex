export const excelDateToString = (value: any): string | null => {

  if (!value) return null

  // Si viene como string (ej: 2026-04-28)
  if (typeof value === 'string') {
    return value
  }

  // Si viene como número (Excel)
  if (typeof value === 'number') {

    const excelEpoch = new Date(Date.UTC(1899, 11, 30))
    const date = new Date(excelEpoch.getTime() + value * 86400000)

    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  return null
}