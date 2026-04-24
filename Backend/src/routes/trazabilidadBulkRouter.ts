import { Router } from 'express'
import multer from 'multer'

import {
  validarTrazabilidadController,
  procesarTrazabilidadController,
  descargarPlantillaTrazabilidad
} from '../controllers/TrazabilidadBulkController'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/plantilla', descargarPlantillaTrazabilidad)
router.post('/validar', upload.single('file'), validarTrazabilidadController)
router.post('/procesar', upload.single('file'), procesarTrazabilidadController)

export default router