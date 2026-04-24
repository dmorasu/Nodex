import { db } from '../config/db'
import EstadosTramites from '../models/estadosTramites'
import Programacion from '../models/programacion'

export const procesarEstados = async (data: any[]) => {

  const t = await db.transaction()
  const errores: any[] = []

  try {

    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      const fila = i + 2

      try {

        // =========================
        // INSERT ESTADO
        // =========================
        const estado = await EstadosTramites.create({
          solicitudTramiteId: row.solicitudTramiteId,
          estadoId: row.estadoId
        }, { transaction: t })

        // =========================
        // REGLA: FINALIZADO
        // =========================
        if (row.estadoId === 6) {

          const ahora = new Date()

          const existeProgramacion = await Programacion.findOne({
            where: { solicitudTramiteId: row.solicitudTramiteId },
            transaction: t
          })

          if (existeProgramacion) {

            await existeProgramacion.update({
              fechaFinalizacionServicio: ahora
            }, { transaction: t })

          } else {

            await Programacion.create({
              solicitudTramiteId: row.solicitudTramiteId,
              fechaFinalizacionServicio: ahora
            }, { transaction: t })
          }
        }

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