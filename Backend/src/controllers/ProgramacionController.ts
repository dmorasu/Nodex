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

    let programacion = await Programacion.findOne({
      where: { solicitudTramiteId: solicitudId }
    });

    if (!programacion) {
      // Crear si no existe
      programacion = await Programacion.create({
        solicitudTramiteId: solicitudId,
        fechaProbableEntrega: req.body.fechaProbableEntrega || null,
        valorTramite: req.body.valorTramite || null,
        valorViaticos: req.body.valorViaticos || null
      });
    } else {
      // Actualizar solo lo que venga en el body

      if (req.body.fechaProbableEntrega !== undefined) {
        programacion.fechaProbableEntrega = req.body.fechaProbableEntrega || null;
      }

      if (req.body.valorTramite !== undefined) {
        programacion.valorTramite = req.body.valorTramite || null;
      }

      if (req.body.valorViaticos !== undefined) {
        programacion.valorViaticos = req.body.valorViaticos || null;
      }

      await programacion.save();
    }

    res.status(201).json("Programación guardada correctamente");

  } catch (error) {
    console.error("ERROR PROGRAMACION:", error);
    res.status(500).json("Hubo un error" );
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