import {Router}  from 'express'
import { handleInputErrors } from '../middleware/validation'
import { validateClienteExits, validateClienteInput } from '../middleware/cliente'
import { ClienteController } from '../controllers/ClienteController'



const router =Router()

router.param('clienteId',validateClienteExits)


router.get('/',ClienteController.getAll)

router.post('/',
    validateClienteInput,
    handleInputErrors,
    ClienteController.create
)

router.get('/:clienteId',
    ClienteController.getById
)

router.put('/:clienteId', 
    ClienteController.updateById
)

router.delete('/:clienteId', 
    ClienteController.deleteById
)


export default router