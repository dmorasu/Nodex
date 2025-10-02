import type {Request, Response} from 'express'
import SolicitudTramites from '../models/solicitudTramites'



declare global{
    namespace Express{
        interface Request{
            solicitudTramites?:SolicitudTramites
        }
    }
}


export class SolicitudTramitesController{
    static getAll = async (req:Request, res:Response)=>{
         try {
                const solicitudTramites=  await SolicitudTramites.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],

                })
                res.json(solicitudTramites)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Hubo un error'})
            
        }

    }

     static create= async (req:Request, res:Response)=>{

         try {
                const solicitudTramites= new SolicitudTramites(req.body)
                await solicitudTramites.save()
                res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
              console.log(error);
              res.status(500).json({error:'No se puede guardar el registro'})
            
        }

       
    }


     static getById = async (req:Request, res:Response)=>{
        res.json(req.solicitudTramites)
    }

     static updateById = async (req:Request, res:Response)=>{
        await req.solicitudTramites.update(req.body)
        res.json('Solicitud Actualizada')
    }

     static deleteById= async (req:Request, res:Response)=>{
        await req.solicitudTramites.destroy()
        res.json('tarifa Eliminada')
        
    }
}