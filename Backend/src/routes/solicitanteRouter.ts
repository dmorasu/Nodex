import {Router}  from 'express'
import { SolicitantesController } from '../controllers/SolicitantesController'
import { handleInputErrors } from '../middleware/validation'
import { validateSolicitanteExits, validateSolicitanteId, validateSolicitanteInput } from '../middleware/solicitante'


const router =Router()

router.param('solicitanteId',validateSolicitanteId)
router.param('solicitanteId',validateSolicitanteExits)

router.get('/',SolicitantesController.getAll)


router.post('/',
    validateSolicitanteInput,
    handleInputErrors,
    SolicitantesController.create
)

router.get('/:solicitanteId',
    
    SolicitantesController.getById
)
router.put('/:solicitanteId',
    validateSolicitanteInput,
    SolicitantesController.updateById)
router.delete('/:solicitanteId',
    
    SolicitantesController.deleteById)



export default router