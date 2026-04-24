import { Router } from 'express'
import multer from 'multer'

import {
  validarLogisticaController,
  procesarLogisticaController,
  descargarPlantillaLogistica
} from '../controllers/LogisticaBulkController'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/plantilla', descargarPlantillaLogistica)
router.post('/validar', upload.single('file'), validarLogisticaController)
router.post('/procesar', upload.single('file'), procesarLogisticaController)

export default router