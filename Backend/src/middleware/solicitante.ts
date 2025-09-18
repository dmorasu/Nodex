import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'
import Solicitantes from "../models/solicitantes";

declare global{
    namespace Express{
        interface Request{
            solicitante?:Solicitantes
        }
    }
}

export const  validateSolicitanteId= async(req:Request,res:Response,next:NextFunction)=>{
         await param('solicitanteId').isInt().withMessage('ID no valido')
            .custom(value => value > 0).withMessage('id no valido')
            .run(req)
        
         let errors = validationResult(req)
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

      
        next()
        
    
}

export const  validateSolicitanteExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{solicitanteId}=req.params
            const solicitante=await  Solicitantes.findByPk(solicitanteId)
            if(!solicitante){
                const error =new Error('No se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.solicitante=solicitante

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateSolicitanteInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombre').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
        await body('prefijo').notEmpty().withMessage('Debe escribir un prefijo').run(req)
               // .isNumeric().withMessage('Debe escribir un prefijo'),  --> Validacion que sea un numero
               //.custom(value=> value > 0 ).withMessage('Presupuesto mayor a cero) --> Validacion numero positivo
        
    next()



}