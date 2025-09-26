import {Router}  from 'express'
import {UsuarioController } from '../controllers/UsuarioController'
import { handleInputErrors } from '../middleware/validation'
import { validateUsuarioExits, validateUsuarioId, validateUsuarioInput } from '../middleware/usuario'


const router =Router()

router.param('usuarioId',validateUsuarioId)
router.param('usuarioId',validateUsuarioExits)

router.get('/',UsuarioController.getAll)


router.post('/',
    validateUsuarioInput,
    handleInputErrors,
    UsuarioController.create
)

router.get('/:usuarioId',
    
    UsuarioController.getById
)
router.put('/:usuarioId',
    validateUsuarioExits,
    UsuarioController.updateById)
router.delete('/:usuarioId',
    
    UsuarioController.deleteById)



export default router