
import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'
import SolicitudTramites from "../models/solicitudTramites";






export const  validateSolicitudTramiteExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{solicitudTramitesId}=req.params
            const solicitudTramites=await  SolicitudTramites.findByPk(solicitudTramitesId)
            if(!solicitudTramites){
                console.log(solicitudTramitesId);
                
                const error =new Error('La solicitud Buscada no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.solicitudTramites=solicitudTramites

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateSolicitudTramitesInput =async(req:Request,res:Response,next:NextFunction)=>{
        
        await body('direccionTramite').notEmpty().withMessage('La direccion de diligencia  no puede estar vacia').run(req)
        await body('detalleSolicitud').notEmpty().withMessage('Debe ingresar un detalle a la Solicitud').run(req)
        
        
    next()



}
