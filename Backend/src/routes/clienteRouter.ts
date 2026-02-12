import {Router}  from 'express'
import { handleInputErrors } from '../middleware/validation'
import { validateClienteExits, validateClienteInput } from '../middleware/cliente'
import { ClienteController,generarPlantillaClientes,validarClientesExcel,cargaMasivaClientes } from '../controllers/ClienteController'
import multer from 'multer'
import { autenticacion } from '../middleware/auth'


const router =Router()

router.param('clienteId',validateClienteExits)

const upload = multer({ storage: multer.memoryStorage() })

router.get('/plantilla', generarPlantillaClientes)

router.post('/validar-excel',
  upload.single('file'),
  validarClientesExcel
)

router.post('/carga-masiva',
  autenticacion,
  upload.single('file'),
  cargaMasivaClientes
)
router.get('/',ClienteController.getAll)
router.get('/search', ClienteController.search)

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