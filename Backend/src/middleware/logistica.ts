import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'

import Logistica from "../models/logistica";





export const  validateLogisticaExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{logisticaId}=req.params
            const logistica=await  Logistica.findByPk(logisticaId)
            if(!logistica){
                const error =new Error('Dato no fue  encontrado en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.logistica=logistica

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateLogisticaInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('numeroGuia').notEmpty().withMessage('la guia no puede estar vacia').run(req)
        
    next()



}

export const  validatelogisticaId = async (req:Request, res:Response, next:NextFunction)=>{
        await param('logisticaId').isInt().custom(value => value>0)
            .withMessage('ID no valido')
            .run(req)

        let error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        next()

}