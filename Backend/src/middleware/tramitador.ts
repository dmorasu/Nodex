import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'

import Tramitador from "../models/tramitador";





export const  validateTramitadorExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{tramitadorId}=req.params
            const tramitador=await  Tramitador.findByPk(tramitadorId)
            if(!tramitador){
                const error =new Error('Dato no encontrado en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.tramitador=tramitador

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateTramitadorInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreTramitador').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
        await body('region').notEmpty().withMessage('La region no debe estar vacia').run(req)
        
    next()



}