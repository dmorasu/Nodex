import { db } from '../config/db'
import Trazabilidad from '../models/trazabilidad'

export const procesarTrazabilidad = async (data: any[]) => {

  const t = await db.transaction()
  const errores: any[] = []

  try {

    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      const fila = i + 2

      try {

        await Trazabilidad.create({
          solicitudTramiteId: row.solicitudTramiteId,
          observacionTrazabilidad: row.observacionTrazabilidad,
          nombreUsuario: row.nombreUsuario || null
        }, { transaction: t })

      } catch (error: any) {
        errores.push({ fila, error: error.message })
      }
    }

    await t.commit()
    return { errores }

  } catch (error) {
    await t.rollback()
    throw error
  }
}