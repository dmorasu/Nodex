import { Router } from 'express'
import multer from 'multer'

import { SolicitudTramitesController } from "../controllers/SolicitudTramitesController"
import { EstadosTramitesController } from '../controllers/EstadosTramitesController'
import { TrazabilidadController } from '../controllers/TrazabilidadController'
import { LogisticaController } from '../controllers/LogisticaController'
import { ProgramacionController } from '../controllers/ProgramacionController'
import { CuentaCobroController } from '../controllers/CuentaCobroController'

import { handleInputErrors } from '../middleware/validation'
import { validateSolicitudTramiteExits, validateSolicitudTramitesInput } from '../middleware/solicitudTramites'
import { validateTrazabilidadInput, validateTrazabilidadExits } from '../middleware/trazabilidad'
import { validateEstadosTramitesInput, validateEstadosTramitesExits } from '../middleware/estadosTramites'
import { validateLogisticaInput, validateLogisticaId } from '../middleware/logistica'
import { validateProgramacionInput, validateProgramacionExits } from '../middleware/programacion'
import { validateCuentaCobroInput, validateCuentaCobroExits } from '../middleware/cuentaCobro'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

// ================= PARAMS =================
router.param('solicitudTramitesId', validateSolicitudTramiteExits)
router.param('trazabilidadId', validateTrazabilidadExits)
router.param('estadosTramitesId', validateEstadosTramitesExits)
router.param('logisticaId', validateLogisticaId)
router.param('programacionId', validateProgramacionExits)
router.param('cuentaCobroId', validateCuentaCobroExits)

// ================= SOLICITUDES =================
router.get('/', SolicitudTramitesController.obtenerSolicitudes)

router.post('/',
  validateSolicitudTramitesInput,
  handleInputErrors,
  SolicitudTramitesController.create
)

router.get('/:solicitudTramitesId', SolicitudTramitesController.getById)
router.put('/:solicitudTramitesId',
  validateSolicitudTramitesInput,
  handleInputErrors,
  SolicitudTramitesController.updateById
)
router.delete('/:solicitudTramitesId', SolicitudTramitesController.deleteById)

// ================= TRAZABILIDAD =================
router.post('/:solicitudTramitesId/trazabilidad',
  validateTrazabilidadInput,
  handleInputErrors,
  TrazabilidadController.create
)
router.get('/:solicitudTramitesId/trazabilidad/:trazabilidadId',
  TrazabilidadController.getById
)
router.put('/:solicitudTramitesId/trazabilidad/:trazabilidadId',
  validateTrazabilidadInput,
  handleInputErrors,
  TrazabilidadController.updateById
)
router.delete('/:solicitudTramitesId/trazabilidad/:trazabilidadId',
  TrazabilidadController.deleteById
)

// ================= ESTADOS =================
router.post('/:solicitudTramitesId/estadosTramites',
  validateEstadosTramitesInput,
  handleInputErrors,
  EstadosTramitesController.create
)
router.get('/:solicitudTramitesId/estadosTramites/:estadosTramitesId',
  EstadosTramitesController.getById
)
router.put('/:solicitudTramitesId/estadosTramites/:estadosTramitesId',
  validateEstadosTramitesInput,
  handleInputErrors,
  EstadosTramitesController.updateById
)
router.delete('/:solicitudTramitesId/estadosTramites/:estadosTramitesId',
  EstadosTramitesController.deleteById
)

// ================= LOGISTICA =================
router.post('/:solicitudTramitesId/logistica',
  validateLogisticaInput,
  handleInputErrors,
  LogisticaController.create
)
router.get('/:solicitudTramitesId/logistica/:logisticaId',
  LogisticaController.getById
)

// ================= PROGRAMACION =================
router.post('/:solicitudTramitesId/programacion',
  validateProgramacionInput,
  handleInputErrors,
  ProgramacionController.create
)
router.get('/:solicitudTramitesId/programacion/:programacionId',
  ProgramacionController.getById
)

// ================= CUENTA COBRO =================
router.post('/:solicitudTramitesId/cuentaCobro',
  validateCuentaCobroInput,
  handleInputErrors,
  CuentaCobroController.create
)
router.get('/:solicitudTramitesId/cuentaCobro/:cuentaCobroId',
  CuentaCobroController.getById
)

export default router
