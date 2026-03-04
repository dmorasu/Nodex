import { Request, Response } from "express"
import { EvaluacionService } from "../services/evaluacion"
import EvaluacionSolicitud from "../models/evaluacionSolicitud"
import EvaluacionRespuesta from "../models/evaluacionRespuestas"
import EvaluacionPregunta from "../models/evaluacionPregunta"

export class EvaluacionController {

  static crearEvaluacion = async (req: Request, res: Response) => {
    try {
      const solicitudTramiteId = Number(req.params.solicitudTramitesId)
      const usuarioId = req.usuario.id // según tu auth
      const { respuestas } = req.body

      const evaluacion = await EvaluacionService.crearEvaluacion(
        solicitudTramiteId,
        usuarioId,
        respuestas
      )

      res.status(201).json(evaluacion)

    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static obtenerEvaluacion = async (req: Request, res: Response) => {
    try {
      const solicitudTramiteId = Number(req.params.solicitudTramitesId)

      const evaluacion = await EvaluacionSolicitud.findOne({
        where: { solicitudTramiteId },
        include: [
          {
            model: EvaluacionRespuesta,
            include: [EvaluacionPregunta]
          }
        ]
      })

      res.json(evaluacion)

    } catch (error) {
      res.status(500).json({ error: "Error al obtener evaluación" })
    }
  }

  static obtenerPreguntas = async (req: Request, res: Response) => {
  const preguntas = await EvaluacionPregunta.findAll({
    where: { activa: true },
    order: [["orden", "ASC"]]
  })

  res.json(preguntas)
}
}
