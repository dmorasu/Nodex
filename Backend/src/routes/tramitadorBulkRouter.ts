import { Router } from 'express'
import multer from 'multer'

import {
  validarTramitadorController,
  procesarTramitadorController,
  descargarPlantillaTramitador
} from '../controllers/TramitadorBulkActualizaciones'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/plantilla', descargarPlantillaTramitador)
router.post('/validar', upload.single('file'), validarTramitadorController)
router.post('/procesar', upload.single('file'), procesarTramitadorController)

export default router