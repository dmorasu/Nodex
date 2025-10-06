import type {Request,Response} from 'express'
import Logistica from '../models/logistica'

declare global{
    namespace Express{
        interface Request{
            logistica?:Logistica
        }
    }
}

export class LogisticaController{


    static getAll =async(req:Request, res:Response)=>{
        try {
                const logistica=await Logistica.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],
                })
                res.json(logistica)
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Error al consultar todos los logisticas'})
            
        }
    }

    static create  =async(req:Request,res:Response)=>{
        try {
                const logistica= new Logistica(req.body)
                await logistica.save()
                res.status(201).json('logistica almacenado correctamente')

        } catch (error) {
            res.status(500).json({error:"No se pudo almacenar el logistica"})
            //console.log(error);
            
            
        }
    }

    static getById =  async (req:Request,res:Response)=>{
        res.json(req.logistica)
    }

    static updateById =async (req:Request,res:Response)=>{
        await req.logistica.update(req.body)
        res.json('logistica Actualizado')
    }

    static deleteById =async(req:Request,res:Response)=>{
        await req.logistica.destroy()
        res.json('logistica Eliminado')
    }

}