import type {Request,Response,NextFunction} from 'express'
import Operaciones from '../models/operaciones'
import  {param, validationResult, body} from 'express-validator'


export const  validateOperacionesExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{operacionesId}=req.params
            const operaciones=await  Operaciones.findByPk(operacionesId)
            if(!operaciones){
                const error =new Error('La operacion no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.operaciones=operaciones

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateOperacionesInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreOperacion').notEmpty().withMessage('El Nombre de la operacion no puede estar vacio').run(req)
     
        
        
        
        
    next()



}