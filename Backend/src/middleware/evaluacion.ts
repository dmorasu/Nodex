import { body } from "express-validator"
import { Request, Response, NextFunction } from "express"

export const validateEvaluacionInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  await body("respuestas")
    .isArray({ min: 1 })
    .withMessage("Debe enviar respuestas")
    .run(req)

  await body("respuestas.*.preguntaId")
    .isInt({ gt: 0 })
    .withMessage("preguntaId inválido")
    .run(req)

  await body("respuestas.*.calificacion")
    .isInt({ min: 1, max: 4 })
    .withMessage("La calificación debe ser entre 1 y 4")
    .run(req)

  next()
}