import { Router } from 'express'
import multer from 'multer'

import {
  validarProgramacionController,
  procesarProgramacionController,
  descargarPlantillaProgramacion
} from '../controllers/ProgramacionBulkController'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/plantilla', descargarPlantillaProgramacion)
router.post('/validar', upload.single('file'), validarProgramacionController)
router.post('/procesar', upload.single('file'), procesarProgramacionController)

export default router