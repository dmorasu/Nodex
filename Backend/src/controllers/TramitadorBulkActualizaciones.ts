import { Request, Response } from 'express'

import { parseExcel } from '../utils/excelParser'
import { validarTramitador } from '../utils/validacionesActualizaciones'
import { procesarTramitador } from '../services/tramitadorActualizaciones'
import { generarPlantillaTramitador } from '../utils/generarPlantillaTramitador'

// VALIDAR
export const validarTramitadorController = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Archivo requerido' })
  }

  const data = parseExcel(req.file.buffer)
  const errores = await validarTramitador(data)

  res.json({
    totalProcesados: data.length,
    errores
  })
}

// PROCESAR
export const procesarTramitadorController = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Archivo requerido' })
  }

  const data = parseExcel(req.file.buffer)

  const errores = await validarTramitador(data)

  if (errores.length > 0) {
    return res.status(400).json({ errores })
  }

  const result = await procesarTramitador(data)

  res.json({
    message: 'Tramitador asignado correctamente',
    totalProcesados: data.length,
    errores: result.errores
  })
}

// PLANTILLA
export const descargarPlantillaTramitador = async (req: Request, res: Response) => {

  const buffer = await generarPlantillaTramitador()

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=plantilla_tramitador.xlsx'
  )

  res.send(buffer)
}