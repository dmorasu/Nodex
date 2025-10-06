import {Router}  from 'express'

import { handleInputErrors } from '../middleware/validation'

import { EstadosController } from '../controllers/EstadosController'

import { validateEstadosExits, validateEstadosInput } from '../middleware/estados'



const router =Router()

router.param('estadosId',validateEstadosExits)


router.get('/',EstadosController.getAll)

router.post('/',
    validateEstadosInput,
    handleInputErrors,
    EstadosController.create
)

router.get('/:estadosId',
    EstadosController.getById
)

router.put('/:estadosId', 
    EstadosController.updateById
)

router.delete('/:estadosId', 
    EstadosController.deleteById
)


export default router