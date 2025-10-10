import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'
import Usuario from "../models/usuarios";

declare global{
    namespace Express{
        interface Request{
            usuario?:Usuario
        }
    }
}

export const  validateUsuarioId= async(req:Request,res:Response,next:NextFunction)=>{
         await param('usuarioId').isInt().withMessage('ID no valido')
            .custom(value => value > 0).withMessage('id no valido')
            .run(req)
        
         let errors = validationResult(req)
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

      
        next()
        
    
}

export const  validateUsuarioExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{usuarioId}=req.params
            const usuario=await  Usuario.findByPk(usuarioId)
            if(!usuario){
                const error =new Error('El usuario no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.usuario=usuario

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateUsuarioInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreUsuario').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
        await body('correoUsuario').notEmpty().withMessage('El correo no puede estar vacio').run(req)
        
               // .isNumeric().withMessage('Debe escribir un prefijo'),  --> Validacion que sea un numero
               //.custom(value=> value > 0 ).withMessage('Presupuesto mayor a cero) --> Validacion numero positivo
        
    next()



}