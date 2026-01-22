import type {Request,Response,NextFunction} from 'express'
import Tramite from '../models/tramite'
import  {param, validationResult, body} from 'express-validator'


export const  validateTramitesExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{tramiteId}=req.params
            const tramites=await  Tramite.findByPk(tramiteId)
            if(!tramites){
                const error =new Error('El trámite no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.tramite=tramites
            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateTramitesInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreOperacion').notEmpty().withMessage('El Nombre del Trámite no puede estar vacio').run(req)
     
        
        
        
        
    next()



}