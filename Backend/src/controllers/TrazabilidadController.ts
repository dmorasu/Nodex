import type { Request,Response } from "express";
import Trazabilidad from "../models/trazabilidad";

declare global{
    namespace Express{
        interface Request{
            trazabilidad?:Trazabilidad       
        }
    }
}

export class TrazabilidadController{
    static getAll =async (req: Request, res:Response) =>{
        
    }

    static create =async (req: Request, res:Response) =>{
         // console.log("req.params.solicitudTramiteId");
         //console.log(req.params.solicitudTramitesId);
         //console.log(req.solicitudTramites.id);
          try {
                const trazabilidad = new Trazabilidad(req.body)
                trazabilidad.solicitudTramiteId =req.solicitudTramites.id
                await trazabilidad.save()
                res.status(201).json('Registro Guardado')


          } catch (error) {
                res.status(500).json({error:"Hubo un error"})
          }
         
         

    }


    static getById =async (req: Request, res:Response) =>{
        res.json(req.trazabilidad)

    }

    static updateById =async (req: Request, res:Response) =>{
        req.trazabilidad.update(req.body)
        res.json("Se actualizo el registro")

    }

    static deleteById =async (req: Request, res:Response) =>{
        await req.trazabilidad.destroy()
        res.json('Registro Eliminado')

    }

}