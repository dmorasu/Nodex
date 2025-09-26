
import {Router} from 'express'
import { SolicitudTramitesController } from "../controllers/SolicitudTramitesController"




const router =Router()

router.get('/tramites', SolicitudTramitesController.getAll)
router.post('/tramites', SolicitudTramitesController.create)
router.get('/tramites/:tramiteId', SolicitudTramitesController.getById)
router.put('/tramites/:tramiteId', SolicitudTramitesController.updateById)
router.delete('/tramites/:tramiteId', SolicitudTramitesController.deleteById)