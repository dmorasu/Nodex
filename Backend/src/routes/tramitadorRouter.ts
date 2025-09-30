import {Router} from 'express'
import { handleInputErrors } from '../middleware/validation'
import { TramitadorController } from '../controllers/TramitadorController'
import { validateTramitadorExits,validateTramitadorInput } from '../middleware/tramitador'

const router =Router()

router.param('tramitadorId',validateTramitadorExits)

router.get('/',TramitadorController.getAll)

router.post('/',
    validateTramitadorInput,
    handleInputErrors,
    TramitadorController.create
)

router.get('/:tramitadorId',
    TramitadorController.getById
)

router.put('/:tramitadorId',
    TramitadorController.updateById
)

router.delete('/:tramitadorId',
    TramitadorController.deleteById
)

export default router