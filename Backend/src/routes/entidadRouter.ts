import {Router}  from 'express'

import { handleInputErrors } from '../middleware/validation'

import { EntidadController } from '../controllers/EntidadController'

import { validateEntidadExits, validateEntidadInput } from '../middleware/entidad'



const router =Router()

router.param('entidadId',validateEntidadExits)


router.get('/',EntidadController.getAll)

router.post('/',
    validateEntidadInput,
    handleInputErrors,
    EntidadController.create
)

router.get('/:entidadId',
    EntidadController.getById
)

router.put('/:entidadId', 
    EntidadController.updateById
)

router.delete('/:entidadId', 
    EntidadController.deleteById
)


export default router