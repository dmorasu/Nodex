import type { Request,Response } from "express";
import CuentaCobro from "../models/cuentaCobro";

declare global{
    namespace Express{
        interface Request{
            cuentaCobro?:CuentaCobro     
        }
    }
}

export class CuentaCobroController{
    static getAll =async (req: Request, res:Response) =>{
        
    }

    static create =async (req: Request, res:Response) =>{
         // console.log("req.params.solicitudTramiteId");
         //console.log(req.params.solicitudTramitesId);
         //console.log(req.solicitudTramites.id);
          try {
                const cuentaCobro = new CuentaCobro(req.body)
                cuentaCobro.solicitudTramitesId =req.solicitudTramites.id
                await cuentaCobro.save()
                res.status(201).json('Registro Guardado')


          } catch (error) {
                res.status(500).json({error:"Hubo un error"})
          }
         
         

    }


    static getById =async (req: Request, res:Response) =>{
        res.json(req.cuentaCobro)

    }

    static updateById =async (req: Request, res:Response) =>{
        req.cuentaCobro.update(req.body)
        res.json("Se actualizo el registro")

    }

    static deleteById =async (req: Request, res:Response) =>{
        await req.cuentaCobro.destroy()
        res.json('Registro Eliminado')

    }

}