import type {Request,Response} from 'express'
import Entidad from '../models/entidad'

declare global{
    namespace Express{
        interface Request{
            entidad?:Entidad       
        }
    }
}

export class EntidadController{
    static getAll =async (req:Request,res:Response) =>{
        try {
                const entidad=  await Entidad.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],

                })
                res.json(entidad)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Hubo un error'})
            
        }
    }

    static create =async(req:Request,  res: Response)=>{
        try {
                const entidad= new Entidad(req.body)
                await entidad.save()
                res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
              console.log(error);
            //res.status(500).json({error:'No se puede guardar el registro'})
            
        }
    }
    static getById= async (req:Request,res:Response)=>{
        
         res.json(req.entidad)

    
    }
     static updateById= async (req:Request,res:Response)=>{
        await req.entidad.update(req.body)
        res.json('Entidad Actualizada')
    
    }
    
     static deleteById= async (req:Request,res:Response)=>{
           await req.entidad.destroy()
            res.json('Entidad Eliminada')
    
    }
}

