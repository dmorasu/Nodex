import type { Request,Response } from "express";
import EstadosTramites from "../models/estadosTramites";

declare global{
    namespace Express{
        interface Request{
            estadosTramites?:EstadosTramites     
        }
    }
}

export class EstadosTramitesController{
    static getAll =async (req: Request, res:Response) =>{
        
    }

    static create =async (req: Request, res:Response) =>{
         // console.log("req.params.solicitudTramiteId");
         //console.log(req.params.solicitudTramitesId);
         //console.log(req.solicitudTramites.id);
          try {
                const estadosTramites = new EstadosTramites(req.body)
                estadosTramites.solicitudTramiteId =req.solicitudTramites.id
                await estadosTramites.save()
                res.status(201).json('Registro Guardado')


          } catch (error) {
                res.status(500).json({error:"Hubo un error"})
          }
         
         

    }


    static getById =async (req: Request, res:Response) =>{
        res.json(req.estadosTramites)

    }

    static updateById =async (req: Request, res:Response) =>{
        req.estadosTramites.update(req.body)
        res.json("Se actualizo el registro")

    }

    static deleteById =async (req: Request, res:Response) =>{
        await req.estadosTramites.destroy()
        res.json('Registro Eliminado')

    }

}