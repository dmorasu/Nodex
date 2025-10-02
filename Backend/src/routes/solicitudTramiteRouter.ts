
import {Router} from 'express'
import { SolicitudTramitesController } from "../controllers/SolicitudTramitesController"
import { TrazabilidadController } from '../controllers/TrazabilidadController'
import { validateSolicitudTramiteExits,validateSolicitudTramitesInput } from '../middleware/solicitudTramites'

import { handleInputErrors } from '../middleware/validation'
import { validateTrazabilidadInput } from '../middleware/trazabilidad'





const router =Router()
router.param('solicitudTramitesId',validateSolicitudTramiteExits)


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

router.get('/:solicitudTramitesId/trazabilidad',TrazabilidadController.getAll)
router.post('/:solicitudTramitesId/trazabilidad',
    validateTrazabilidadInput,
    handleInputErrors,
    TrazabilidadController.create)
router.get('/:solicitudTramitesId/trazabilidad/:TrazabilidadId',TrazabilidadController.getById)
router.put('/:solicitudTramitesId/trazabilidad/:TrazabilidadId',TrazabilidadController.updateById)
router.delete('/:solicitudTramitesId/trazabilidad/:TrazabilidadId',TrazabilidadController.deleteById)



//Rutas para Estados



//Rutas para Cuenta Cobro



//Rutas para Logistica


//Rutas para Programacion



export default router