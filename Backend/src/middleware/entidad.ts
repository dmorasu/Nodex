import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'
import Usuario from "../models/entidad";
import Entidad from "../models/entidad";





export const  validateEntidadExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{entidadId}=req.params
            const entidad=await  Usuario.findByPk(entidadId)
            if(!entidad){
                const error =new Error('La entidad no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.entidad=entidad

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateEntidadInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreEntidad').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
        
        
    next()



}