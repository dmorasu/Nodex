
import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'
import Tarifa from "../models/tarifa";






export const  validateTarifaExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{tarifaId}=req.params
            const tarifa=await  Tarifa.findByPk(tarifaId)
            if(!tarifa){
                const error =new Error('El tarifa no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.tarifa=tarifa

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateTarifaInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreTarifa').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
        await body('valorTarifa')
        .notEmpty().withMessage('El valor no puede estar vacío')
        .isNumeric().withMessage('El valor debe ser numérico')
        .custom(value => {
            if (Number(value) <= 0) {
            throw new Error('El valor debe ser mayor a 0');
            }
            return true;
            })
        .run(req);
        
        
    next()



}