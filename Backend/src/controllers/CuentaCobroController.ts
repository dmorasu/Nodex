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

    static create = async (req: Request, res: Response) => {
    try {
      const solicitudId = req.solicitudTramites.id

      // Buscar si ya existe cuentaCobro para esta solicitud
      let cuentaCobro = await CuentaCobro.findOne({
        where: { solicitudTramiteId: solicitudId }
      })

      if (!cuentaCobro) {
        // 👉 Crear si no existe
        cuentaCobro = await CuentaCobro.create({
          solicitudTramiteId: solicitudId,
          ...req.body
        })
      } else {
        // 👉 Actualizar solo campos enviados
        Object.keys(req.body).forEach((key) => {
          if (req.body[key] !== undefined) {
            cuentaCobro[key] = req.body[key] || null
          }
        })
        await cuentaCobro.save()
      }

      res.status(201).json("Registro  guardado correctamente");


    } catch (error) {
      console.error("ERROR PROGRAMACION:", error);
    res.status(500).json({ error: "Hubo un error" });

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