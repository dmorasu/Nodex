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
      // Guardar estado
      const estadosTramites = new EstadosTramites(req.body)
      estadosTramites.solicitudTramiteId = req.solicitudTramites.id
      await estadosTramites.save()

      // --- Si estado = Finalizado ---
      if (Number(estadosTramites.estadoId) === 6) {

        const fechaFinalizacionServicio = new Date()

        let programacion = await Programacion.findOne({
          where: { solicitudTramiteId: req.solicitudTramites.id }
        })

        // Si ya fue finalizado antes
        if (programacion && programacion.fechaFinalizacionServicio) {
          return res.status(400).json({ error: "El trámite ya fue finalizado previamente" })
        }

        // Si no existe programación → crear registro
        if (!programacion) {
          await Programacion.create({
            solicitudTramiteId: req.solicitudTramites.id,
            fechaFinalizacionServicio: fechaFinalizacionServicio
          })
        } 
        // Si existe → actualizar fecha de finalización
        else {
          programacion.fechaFinalizacionServicio = fechaFinalizacionServicio
          await programacion.save()
        }
      }

      return res.status(201).json("Registro Guardado")

    } catch (error) {
      console.error("ERROR CREANDO ESTADO:", error)
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