
import {Router} from 'express'
import { SolicitudTramitesController } from "../controllers/SolicitudTramitesController"
import { TrazabilidadController } from '../controllers/TrazabilidadController'
import { validateSolicitudTramiteExits,validateSolicitudTramitesInput } from '../middleware/solicitudTramites'

import { handleInputErrors } from '../middleware/validation'
import { validateTrazabilidadInput,validateTrazabilidadId,validateTrazabilidadExits } from '../middleware/trazabilidad'





const router =Router()
router.param('solicitudTramitesId',validateSolicitudTramiteExits)
router.param('trazabilidadId', validateTrazabilidadId)
router.param('trazabilidadId',validateTrazabilidadExits )


//Rutas de Tramites 

router.get('/', SolicitudTramitesController.getAll)
router.post('/', 
    validateSolicitudTramitesInput,
    handleInputErrors,
    SolicitudTramitesController.create)
router.get('/:solicitudTramitesId',
    
     SolicitudTramitesController.getById)
router.put('/:solicitudTramitesId',
    validateSolicitudTramitesInput,
    SolicitudTramitesController.updateById)
router.delete(':solicitudTramiteId', SolicitudTramitesController.deleteById)


//Rutas para Trazabilidad


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



//Rutas para Estados



//Rutas para Cuenta Cobro



//Rutas para Logistica


//Rutas para Programacion



export default router