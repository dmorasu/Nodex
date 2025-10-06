import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'
import Programacion from "../models/programacion";





export const  validateProgramacionExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{programacionId}=req.params
            const programacion=await  Programacion.findByPk(programacionId)
            if(!programacion){
                const error =new Error('Dato no fue  encontrado en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.programacion=programacion

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateProgramacionInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('fechaRealizacionDiligencia').notEmpty().withMessage('La fecha de dilgencia no puede estar vacia').run(req)
        await body('fechaProbableEntrega').notEmpty().withMessage('La fecha probable de entrega no puede estar vacia').run(req)
        
    next()



}

export const  validateProgramacionId = async (req:Request, res:Response, next:NextFunction)=>{
        await param('programacionId').isInt().custom(value => value>0)
            .withMessage('ID no valido')
            .run(req)

        let error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        next()

}