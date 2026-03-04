import { db } from "../config/db"
import EvaluacionSolicitud from "../models/evaluacionSolicitud"
import EvaluacionRespuesta from "../models/evaluacionRespuestas"
import EstadosTramites from "../models/estadosTramites"
import Estados from "../models/estados"

export class EvaluacionService {

  static async crearEvaluacion(
    solicitudTramiteId: number,
    usuarioId: number,
    respuestas: any[]
  ) {

    return await db.transaction(async (t) => {

      const ultimoEstado = await EstadosTramites.findOne({
        where: { solicitudTramiteId },
        include: [{ model: Estados }],
        order: [["createdAt", "DESC"]],
        transaction: t
      })

      if (!ultimoEstado || ultimoEstado.estado.nombreEstado !== "Finalizado") {
        throw new Error("Solo se puede evaluar trámites finalizados")
      }

      const existe = await EvaluacionSolicitud.findOne({
        where: { solicitudTramiteId },
        transaction: t
      })

      if (existe) {
        throw new Error("Esta solicitud ya fue evaluada")
      }

      const evaluacion = await EvaluacionSolicitud.create(
        {
          solicitudTramiteId,
          usuarioId
        },
        { transaction: t }
      )

      let suma = 0

      for (const r of respuestas) {
        suma += r.calificacion

        await EvaluacionRespuesta.create({
          evaluacionSolicitudId: evaluacion.id,
          preguntaId: r.preguntaId,
          calificacion: r.calificacion
        }, { transaction: t })
      }

      evaluacion.promedio = suma / respuestas.length
      await evaluacion.save({ transaction: t })

      return evaluacion
    })
  }
}