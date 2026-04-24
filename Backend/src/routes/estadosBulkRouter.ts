import { Router } from 'express'
import multer from 'multer'

import {
  validarEstadosController,
  procesarEstadosController,
  descargarPlantillaEstados
} from '../controllers/EstadosBulkController'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/plantilla', descargarPlantillaEstados)
router.post('/validar', upload.single('file'), validarEstadosController)
router.post('/procesar', upload.single('file'), procesarEstadosController)

export default router