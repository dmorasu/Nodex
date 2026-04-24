import { Request, Response } from 'express'

import { parseExcel } from '../utils/excelParser'
import { validarTrazabilidad } from '../utils/validacionesActualizaciones'
import { procesarTrazabilidad } from '../services/trazabilidadActualizaciones'
import { generarPlantillaTrazabilidad } from '../utils/generarPlantillaTrazabilidad'

// VALIDAR
export const validarTrazabilidadController = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Archivo requerido' })
  }

  const data = parseExcel(req.file.buffer)
  const errores = await validarTrazabilidad(data)

  res.json({
    totalProcesados: data.length,
    errores
  })
}

// PROCESAR
export const procesarTrazabilidadController = async (req: Request, res: Response) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Archivo requerido' })
  }

  const data = parseExcel(req.file.buffer)

  const errores = await validarTrazabilidad(data)

  if (errores.length > 0) {
    return res.status(400).json({ errores })
  }

  const result = await procesarTrazabilidad(data)

  res.json({
    message: 'Trazabilidad cargada correctamente',
    totalProcesados: data.length,
    errores: result.errores
  })
}

// PLANTILLA
export const descargarPlantillaTrazabilidad = async (req: Request, res: Response) => {

  const buffer = await generarPlantillaTrazabilidad()

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=plantilla_trazabilidad.xlsx'
  )

  res.send(buffer)
}