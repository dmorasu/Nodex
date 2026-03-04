import type { Request,Response } from "express";
import EstadosTramites from "../models/estadosTramites";
import Programacion from "../models/programacion";

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

   static create = async (req: Request, res: Response) => {
  try {

    const estadosTramites = new EstadosTramites(req.body)
    estadosTramites.solicitudTramiteId = req.solicitudTramites.id

    console.log("ESTADO RECIBIDO:", estadosTramites.estadoId)

    if (Number(estadosTramites.estadoId) === 6) {
      console.log("ENTRÓ AL IF FINALIZADO")
      await estadosTramites.save()

      return res.status(201).json({
        success: true,
        requiereEvaluacion: true
      })
    }

    await estadosTramites.save()

    return res.status(201).json({
      success: true,
      requiereEvaluacion: false
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Hubo un error" })
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