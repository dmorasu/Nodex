import { Router } from "express"
import { SolicitudesBulkController } from "../controllers/SolicitudesBulkController"

const router = Router()

router.post("/estado", SolicitudesBulkController.cambiarEstado)
router.post("/tramitador", SolicitudesBulkController.asignarTramitador)
router.post("/trazabilidad", SolicitudesBulkController.crearTrazabilidad)
router.post("/programacion", SolicitudesBulkController.programacion)
router.post("/logistica", SolicitudesBulkController.logistica)

export default router