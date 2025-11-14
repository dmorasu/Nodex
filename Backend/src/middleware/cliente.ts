
import type {Request,Response, NextFunction } from "express";
import  {param, validationResult, body} from 'express-validator'
import Cliente from "../models/clientes";






export const  validateClienteExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{clienteId}=req.params
            const cliente=await  Cliente.findByPk(clienteId)
            if(!cliente){
                const error =new Error('El cliente no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.cliente=cliente

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateClienteInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreCliente').notEmpty().withMessage('El Nombre no puede estar vacio').run(req)
        await body('identificacionCliente').notEmpty().withMessage('Debe ingresar una identificacion').run(req)
        await body('telefono').notEmpty().withMessage('Debe ingresar un numero telefonico').run(req)
        await body('telefonoMovil').notEmpty().withMessage('Debe ingresar un numero telefonico Movil').run(req)
        
        
    next()



}
