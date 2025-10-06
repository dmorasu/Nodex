import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'

import EstadosTramites from "../models/estadosTramites";






export const  validateEstadosTramitesExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{estadosTramitesId}=req.params
            const estadosTramites=await  EstadosTramites.findByPk(estadosTramitesId)
            if(!estadosTramites){
                const error =new Error('Dato no fue  encontrado en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.estadosTramites=estadosTramites

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateEstadosTramitesInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('estadoId').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
        await body('solicitudTramiteId').notEmpty().withMessage('Debe registrar un id de Solicitud tramite').run(req)
        
    next()



}

export const  validateEstadoTramitesId = async (req:Request, res:Response, next:NextFunction)=>{
        await param('estadosTramiteId').isInt().custom(value => value>0)
            .withMessage('ID no valido')
            .run(req)

        let error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        next()

}