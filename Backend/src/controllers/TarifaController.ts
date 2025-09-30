import type {Request,Response} from 'express'
import Tarifa from '../models/tarifa'

declare global{
    namespace Express{
        interface Request{
            tarifa?:Tarifa       
        }
    }
}

export class TarifaController{
    static getAll =async (req:Request,res:Response) =>{
        try {
                const tarifa=  await Tarifa.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],

                })
                res.json(tarifa)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Hubo un error'})
            
        }
    }

    static create =async(req:Request,  res: Response)=>{
        try {
                const tarifa= new Tarifa(req.body)
                await tarifa.save()
                res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
              console.log(error);
            //res.status(500).json({error:'No se puede guardar el registro'})
            
        }
    }
    static getById= async (req:Request,res:Response)=>{
        
         res.json(req.tarifa)

    
    }
     static updateById= async (req:Request,res:Response)=>{
        await req.tarifa.update(req.body)
        res.json('tarifa Actualizada')
    
    }
    
     static deleteById= async (req:Request,res:Response)=>{
           await req.tarifa.destroy()
            res.json('tarifa Eliminada')
    
    }
}

