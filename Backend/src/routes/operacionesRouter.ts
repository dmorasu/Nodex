import {Router}  from 'express'

import { handleInputErrors } from '../middleware/validation'

import { OperacionesController } from '../controllers/OperacionesController'

import { validateOperacionesExits,validateOperacionesInput} from '../middleware/operaciones'



const router =Router()

router.param('operacionesId',validateOperacionesExits)


router.get('/',OperacionesController.getAll)

router.post('/',
   validateOperacionesInput,
    handleInputErrors,
    OperacionesController.create
)

router.get('/:operacionesId',
    OperacionesController.getById
)

router.put('/:operacionesId', 
    OperacionesController.updateById
)

router.delete('/:operacionesId', 
    OperacionesController.deleteById
)


export default router