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

    static create = async (req: Request, res: Response) => {
  try {
    const solicitudId = req.solicitudTramites.id;

    // Buscar si ya existe programación
    let programacion = await Programacion.findOne({
      where: { solicitudTramitesId: solicitudId }
    });

    if (!programacion) {
      // Crear si no existe
      programacion = await Programacion.create({
        solicitudTramitesId: solicitudId,
        fechaProbableEntrega: req.body.fechaProbableEntrega || null
      });
    } else {
      // Actualizar solo los campos permitidos
      
      programacion.fechaProbableEntrega = req.body.fechaProbableEntrega || programacion.fechaProbableEntrega;
      await programacion.save();
    }

    res.status(201).json("Programación guardada correctamente");

  } catch (error) {
    console.error("ERROR PROGRAMACION:", error);
    res.status(500).json({ error: "Hubo un error" });
  }
};



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