import type {Request,Response} from 'express'
import Tramitador from '../models/tramitador'

declare global{
    namespace Express{
        interface Request{
            tramitador?:Tramitador       
        }
    }
}

export class TramitadorController{
    static getAll =async (req:Request,res:Response) =>{
        try {
                const tramitador=  await Tramitador.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],

                })
                res.json(tramitador)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Hubo un error'})
            
        }
    }

    static create =async(req:Request,  res: Response)=>{
        try {
                const tramitador= new Tramitador(req.body)
                await tramitador.save()
                res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
              console.log(error);
            //res.status(500).json({error:'No se puede guardar el registro'})
            
        }
    }
    static getById= async (req:Request,res:Response)=>{
        
         res.json(req.tramitador)

    
    }
     static updateById= async (req:Request,res:Response)=>{
        await req.tramitador.update(req.body)
        res.json('Registro Actualizado')
    
    }
    
     static deleteById= async (req:Request,res:Response)=>{
           await req.tramitador.destroy()
            res.json('Registro Eliminado')
    
    }
}

