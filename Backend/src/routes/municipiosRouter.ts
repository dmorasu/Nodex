import {Router} from 'express'
import { handleInputErrors } from '../middleware/validation'
import { MunicipioController } from '../controllers/MunicipiosController'
import { validateMunicipioExits,validateMunicipioInput } from '../middleware/municipio'

const router =Router()

router.param('municipioId',validateMunicipioExits)

router.get('/',MunicipioController.getAll)
router.get('/search',MunicipioController.search)

router.post('/',
    validateMunicipioInput,
    handleInputErrors,
    MunicipioController.create
)

router.get('/:municipioId',
    MunicipioController.getById
)

router.put('/:municipioId',
    MunicipioController.updateById
)

router.delete('/:municipioId',
    MunicipioController.deleteById
)

export default router