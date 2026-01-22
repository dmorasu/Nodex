
import {Router} from 'express'
import { SolicitudTramitesController } from "../controllers/SolicitudTramitesController"
import { TrazabilidadController } from '../controllers/TrazabilidadController'
import { validateSolicitudTramiteExits,validateSolicitudTramitesInput } from '../middleware/solicitudTramites'
import { handleInputErrors } from '../middleware/validation'
import { validateTrazabilidadInput,validateTrazabilidadId,validateTrazabilidadExits } from '../middleware/trazabilidad'
import { validateEstadosTramitesInput, validateEstadoTramitesId } from '../middleware/estadosTramites'
import { EstadosTramitesController } from '../controllers/EstadosTramitesController'
import { validatelogisticaId, validateLogisticaInput } from '../middleware/logistica'
import { LogisticaController } from '../controllers/LogisticaController'
import { ProgramacionController } from '../controllers/ProgramacionController'
import { validateProgramacionId, validateProgramacionInput } from '../middleware/programacion'
import { validateCuentaCobroId, validateCuentaCobroInput } from '../middleware/cuentaCobro'
import { CuentaCobroController } from '../controllers/CuentaCobroController'





const router =Router()
router.param('solicitudTramitesId',validateSolicitudTramiteExits)
router.param('trazabilidadId', validateTrazabilidadId)
router.param('trazabilidadId',validateTrazabilidadExits )
router.param('estadosTramitesId',validateEstadoTramitesId)
router.param('logisticaId',validatelogisticaId)
router.param('programacionId',validateProgramacionId)
router.param('cuentaCobroId',validateCuentaCobroId)


//--------------------------------------------Rutas de SolicitudTramites  ----------------------------------------------------------



//router.get('/', SolicitudTramitesController.getAll)
router.get('/',SolicitudTramitesController.obtenerSolicitudes)
router.post('/', 
    validateSolicitudTramitesInput,
    handleInputErrors,
    SolicitudTramitesController.create)
router.get('/:solicitudTramitesId',
    
    SolicitudTramitesController.getById)
router.put('/:solicitudTramitesId',
    validateSolicitudTramitesInput,
    SolicitudTramitesController.updateById)
router.delete('/:solicitudTramitesId', SolicitudTramitesController.deleteById)



//--------------------------------------------Rutas para Trazabilidad --------------------------------------------------------------------



router.post('/:solicitudTramitesId/trazabilidad',
    validateTrazabilidadInput,
    handleInputErrors,
    TrazabilidadController.create)
router.get('/:solicitudTramitesId/trazabilidad/:trazabilidadId',TrazabilidadController.getById)
router.put('/:solicitudTramitesId/trazabilidad/:trazabilidadId',
    validateTrazabilidadInput,
    handleInputErrors,
    TrazabilidadController.updateById)
router.delete('/:solicitudTramitesId/trazabilidad/:trazabilidadId',TrazabilidadController.deleteById)



//---------------------------------------------Rutas para EstadosTramites ----------------------------------------------------------------------


router.post('/:solicitudTramitesId/estadosTramites',
    validateEstadosTramitesInput,
    handleInputErrors,
    EstadosTramitesController.create)
router.get('/:solicitudTramitesId/estadosTramites/:estadosTramitesId',EstadosTramitesController.getById)
router.get('/estadosTramites',EstadosTramitesController.getAll
)
router.put('/:solicitudTramitesId/estadosTramites/:estadosTramitesId',
    validateEstadosTramitesInput,
    handleInputErrors,
    EstadosTramitesController.updateById)
router.delete('/:solicitudTramitesId/estadosTramites/:estadosTramitesId',EstadosTramitesController.deleteById)



//------------------------------------------------- Rutas para Logistica -----------------------------------------------------------------------


router.post('/:solicitudTramitesId/logistica',
    validateLogisticaInput,
    handleInputErrors,
    LogisticaController.create)
router.get('/:solicitudTramitesId/logistica/:logisticaId',LogisticaController.getById)
router.put('/:solicitudTramitesId/logistica/:logisticaId',
     validateLogisticaInput,
    handleInputErrors,
    LogisticaController.updateById)
router.delete('/:solicitudTramitesId/logistica/:logisticaId',LogisticaController.deleteById)




//--------------------------------------------------- Rutas para Programacion -------------------------------------------------------------------


router.post('/:solicitudTramitesId/programacion',
    validateProgramacionInput,
    handleInputErrors,
    ProgramacionController.create)
router.get('/:solicitudTramitesId/programacion/:programacionId',ProgramacionController.getById)
router.put('/:solicitudTramitesId/programacion/:programacionId',
    validateProgramacionInput,
    handleInputErrors,
    ProgramacionController.updateById)
router.delete('/:solicitudTramitesId/programacion/:programacionId',ProgramacionController.deleteById)


router.post('/:solicitudTramitesId/programacion',
  validateProgramacionInput,
  handleInputErrors,
  ProgramacionController.create
)
  



//--------------------------------------------------- Rutas para Cuenta Cobro -----------------------------------------------------------------------

router.post('/:solicitudTramitesId/cuentaCobro',
    validateCuentaCobroInput,
    handleInputErrors,
    CuentaCobroController.create)
router.get('/:solicitudTramitesId/cuentaCobro/:cuentaCobroId',CuentaCobroController.getById)
router.put('/:solicitudTramitesId/cuentaCobro/:cuentaCobroId',
    validateCuentaCobroInput,
    handleInputErrors,
    CuentaCobroController.updateById)
router.delete('/:solicitudTramitesId/cuentaCobro/:cuentaCobroId',CuentaCobroController.deleteById)


//------------------------------------------------Rutas para Tramitador --------------------------------------------------------------------------------
router.patch(
  '/:solicitudTramitesId/asignar-tramitador',
  validateSolicitudTramiteExits,
  SolicitudTramitesController.asignarTramitador
)





export default router