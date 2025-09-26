import type { Request,Response } from "express";
import Usuarios from "../models/usuarios";


export class UsuarioController{
    static getAll= async (req:Request,res:Response)=>{
        try {
            
            const usuario=await Usuarios.findAll({ 
                order:[
                    ['createdAt','DESC']
                ],
                // TODO:Filtrar por usuario autenticado
            })
            res.json(usuario)
        
        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})
        }
    
    }

    static create= async (req:Request,res:Response)=>{
        try {
            const usuario=new Usuarios(req.body)
            await usuario.save()
            res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
            console.log(error);
            //res.status(500).json({error:'No se puede guardar el registro'})

            
            
        }
    
    }

    static getById= async (req:Request,res:Response)=>{
        
         res.json(req.usuario)

    
    }
     static updateById= async (req:Request,res:Response)=>{
        await req.usuario.update(req.body)
        res.json('Registro Actualizado')
    
    }
    
     static deleteById= async (req:Request,res:Response)=>{
           await req.usuario.destroy()
            res.json('Solicitante Eliminado')
    
    }
    
}
