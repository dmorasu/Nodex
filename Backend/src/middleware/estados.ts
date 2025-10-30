
import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'
import Estados from "../models/estados";






export const  validateEstadosExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{estadosId}=req.params
            const estados=await  Estados.findByPk(estadosId)
            if(!estados){
                const error =new Error('El estados no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.estados=estados

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateEstadosInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreEstado').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
       
        
        
    next()



}