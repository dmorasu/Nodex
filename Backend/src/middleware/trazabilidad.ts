import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'

import Trazabilidad from "../models/trazabilidad";





export const  validateTrazabilidadExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{trazabilidadId}=req.params
            const trazabiidad=await  Trazabilidad.findByPk(trazabilidadId)
            if(!trazabiidad){
                const error =new Error('Dato no fue  encontrado en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.trazabilidad=trazabiidad

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateTrazabilidadInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreUsuario').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
        await body('observacionTrazabilidad').notEmpty().withMessage('La observacion no puede estar vacia').run(req)
        
    next()



}

export const  validateTrazabilidadId = async (req:Request, res:Response, next:NextFunction)=>{
        await param('trazabilidadId').isInt().custom(value => value>0)
            .withMessage('ID no valido')
            .run(req)

        let error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        next()

}