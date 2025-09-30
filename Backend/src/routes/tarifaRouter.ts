import {Router} from 'express'
import { handleInputErrors } from '../middleware/validation'
import { TarifaController } from '../controllers/TarifaController'
import { validateTarifaExits,validateTarifaInput } from '../middleware/tarifa'

const router =Router()

router.param('tarifaId',validateTarifaExits)

router.get('/',TarifaController.getAll)

router.post('/',
    validateTarifaInput,
    handleInputErrors,
    TarifaController.create
)

router.get('/:tarifaId',
    TarifaController.getById
)

router.put('/:tarifaId',
    TarifaController.updateById
)

router.delete('/:tarifaId',
    TarifaController.deleteById
)

export default router