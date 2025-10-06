import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'

import CuentaCobro from "../models/cuentaCobro";





export const  validateCuentaCobroExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{cuentaCobroId}=req.params
            const cuentaCobro=await  CuentaCobro.findByPk(cuentaCobroId)
            if(!cuentaCobro){
                const error =new Error('Dato no fue  encontrado en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.cuentaCobro=cuentaCobro

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateCuentaCobroInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('numeroCuentaCobro').notEmpty().withMessage('El número de la cuenta de cobro no puede estar vacia').run(req)
       
        
    next()



}

export const  validateCuentaCobroId = async (req:Request, res:Response, next:NextFunction)=>{
        await param('cuentaCobroId').isInt().custom(value => value>0)
            .withMessage('ID no valido')
            .run(req)

        let error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        next()

}