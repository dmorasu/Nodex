import type { Request,Response } from "express";
import Programacion from "../models/programacion";

declare global{
    namespace Express{
        interface Request{
            programacion?:Programacion      
        }
    }
}

export class ProgramacionController{
    static getAll =async (req: Request, res:Response) =>{
        
    }

    static create =async (req: Request, res:Response) =>{
         // console.log("req.params.solicitudTramiteId");
         //console.log(req.params.solicitudTramitesId);
         //console.log(req.solicitudTramites.id);
          try {
                const programacion = new Programacion(req.body)
                programacion.solicitudTramitesId =req.solicitudTramites.id
                await programacion.save()
                res.status(201).json('Registro Guardado')


          } catch (error) {
                res.status(500).json({error:"Hubo un error"})
          }
         
         

    }


    static getById =async (req: Request, res:Response) =>{
        res.json(req.programacion)

    }

    static updateById =async (req: Request, res:Response) =>{
        req.programacion.update(req.body)
        res.json("Se actualizo el registro")

    }

    static deleteById =async (req: Request, res:Response) =>{
        await req.programacion.destroy()
        res.json('Registro Eliminado')

    }

}