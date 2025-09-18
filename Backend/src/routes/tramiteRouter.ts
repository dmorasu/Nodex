
import {Router} from 'express'
import { TramitesController } from "../controllers/tramitesController"




const router =Router()

router.get('/tramites', TramitesController.getAll)
router.post('/tramites', TramitesController.create)
router.get('/tramites/:tramiteId', TramitesController.getById)
router.put('/tramites/:tramiteId', TramitesController.updateById)
router.delete('/tramites/:tramiteId', TramitesController.deleteById)