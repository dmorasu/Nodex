import {Router}  from 'express'

import { handleInputErrors } from '../middleware/validation'

import { TransportadoraController } from '../controllers/TrasnsportadoraController'

import { validateTransportadoraExists,validateTransportadoraInput} from '../middleware/transportadora'



const router =Router()

router.param('transportadoraId',validateTransportadoraExists)


router.get('/',TransportadoraController.getAll)

router.post('/',
   validateTransportadoraInput,
    handleInputErrors,
    TransportadoraController.create
)

router.get('/:transportadoraId',
    TransportadoraController.getById
)

router.put('/:transportadoraId', 
    TransportadoraController.updateById
)

router.delete('/:transportadoraId', 
    TransportadoraController.deleteById
)


export default router