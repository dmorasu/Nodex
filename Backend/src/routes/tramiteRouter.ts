import {Router}  from 'express'

import { handleInputErrors } from '../middleware/validation'

import { TramiteController } from '../controllers/TramiteController'

import { validateTramitesExits,validateTramitesInput} from '../middleware/tramite'



const router =Router()

router.param('tramiteId',validateTramitesExits)


router.get('/',TramiteController.getAll)

router.post('/',
   validateTramitesInput,
    handleInputErrors,
    TramiteController.create
)

router.get('/:tramiteId',
    TramiteController.getById
)

router.put('/:tramiteId', 
    TramiteController.updateById
)

router.delete('/:tramiteId', 
    TramiteController.deleteById
)


export default router