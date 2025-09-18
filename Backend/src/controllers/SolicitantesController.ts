import type { Request,Response } from "express";
import Solicitantes from "../models/solicitantes";
import { param } from "express-validator";

export class SolicitantesController{
    static getAll= async (req:Request,res:Response)=>{
        try {
            
            const solicitante=await Solicitantes.findAll({
                order:[
                    ['createdAt','DESC']
                ],
                // TODO:Filtrar por usuario autenticado
            })
            res.json(solicitante)
        
        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})
        }
    
    }

    static create= async (req:Request,res:Response)=>{
        try {
            const solicitante=new Solicitantes(req.body)
            await solicitante.save()
            res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
    }

    static getById= async (req:Request,res:Response)=>{
        
         res.json(req.solicitante)

    
    }
     static updateById= async (req:Request,res:Response)=>{
        await req.solicitante.update(req.body)
        res.json('Registro Actualizado')
    
    }
    
     static deleteById= async (req:Request,res:Response)=>{
           await req.solicitante.destroy()
            res.json('Solicitante Eliminado')
    
    }
    
}
