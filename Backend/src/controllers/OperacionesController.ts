import type {Request,Response} from 'express'
import Operaciones from '../models/operaciones'

declare global{
    namespace Express{
        interface Request{
            operaciones?:Operaciones       
        }
    }
}

export class OperacionesController{
    static getAll =async (req:Request,res:Response) =>{
        try {
                const operaciones=  await Operaciones.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],

                })
                res.json(operaciones)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Hubo un error'})
            
        }
    }

    static create =async(req:Request,  res: Response)=>{
        try {
                const operaciones= new Operaciones(req.body)
                await operaciones.save()
                res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
              console.log(error);
            //res.status(500).json({error:'No se puede guardar el registro'})
            
        }
    }
    static getById= async (req:Request,res:Response)=>{
        
         res.json(req.operaciones)

    
    }
     static updateById= async (req:Request,res:Response)=>{
        await req.operaciones.update(req.body)
        res.json('Entidad Actualizada')
    
    }
    
     static deleteById= async (req:Request,res:Response)=>{
           await req.operaciones.destroy()
            res.json('Entidad Eliminada')
    
    }
}

