import { Request, Response } from 'express'

import { parseExcel } from '../utils/excelParser'
import { validarProgramacion } from '../utils/validacionesActualizaciones'
import { procesarProgramacion } from '../services/programacionActualizaciones'
import { generarPlantillaProgramacion } from '../utils/generarPlantillaProgramacion'

// VALIDAR
export const validarProgramacionController = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Archivo requerido' })
  }

  const data = parseExcel(req.file.buffer)
  const errores = await validarProgramacion(data)

  res.json({
    totalProcesados: data.length,
    errores
  })
}

// PROCESAR
export const procesarProgramacionController = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Archivo requerido' })
  }

  const data = parseExcel(req.file.buffer)

  const errores = await validarProgramacion(data)

  if (errores.length > 0) {
    return res.status(400).json({ errores })
  }

  const result = await procesarProgramacion(data)

  res.json({
    message: 'Programación cargada correctamente',
    totalProcesados: data.length,
    errores: result.errores
  })
}

// PLANTILLA
export const descargarPlantillaProgramacion = async (req: Request, res: Response) => {

  const buffer = await generarPlantillaProgramacion()

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=plantilla_programacion.xlsx'
  )

  res.send(buffer)
}