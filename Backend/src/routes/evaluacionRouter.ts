import { Router } from "express"
import { EvaluacionController } from "../controllers/Evaluacioncontroller"
import { validateEvaluacionInput } from "../middleware/evaluacion"
import { handleInputErrors } from "../middleware/validation"
import { autenticacion } from "../middleware/auth"

const router = Router()

// Crear evaluación de solicitud
router.post(
  "/:solicitudTramitesId/evaluacion",
  autenticacion,
  validateEvaluacionInput,
  handleInputErrors,
  EvaluacionController.crearEvaluacion
)

// Ver evaluación de una solicitud
router.get(
  "/:solicitudTramitesId/evaluacion",
  EvaluacionController.obtenerEvaluacion
)
router.get("/evaluacion/preguntas", EvaluacionController.obtenerPreguntas)

export default router
