import type { Request,Response } from "express";
import { db } from "../config/db"
import EstadosTramites from "../models/estadosTramites";
import Programacion from "../models/programacion";
import Estados from "../models/estados"

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
  const transaction = await db.transaction()

  try {
    const estadosTramites = new EstadosTramites(req.body)
    estadosTramites.solicitudTramiteId = req.solicitudTramites.id

    console.log("ESTADO RECIBIDO:", estadosTramites.estadoId)

    // Guardar estado dentro de la transacción
    await estadosTramites.save({ transaction })

    // 🔎 Validación más robusta (opcional pero recomendada)
    const estado = await Estados.findByPk(estadosTramites.estadoId, { transaction })

    const esFinalizado =
      Number(estadosTramites.estadoId) === 6 ||
      estado?.nombreEstado?.toLowerCase() === "finalizado"

    if (esFinalizado) {
      console.log("ENTRÓ A PROCESO FINALIZADO")

      const fechaActual = new Date()

      // 🔥 Buscar si ya existe programación
      const programacion = await Programacion.findOne({
        where: {
          solicitudTramiteId: estadosTramites.solicitudTramiteId
        },
        transaction
      })

      if (programacion) {
        // ✅ UPDATE
        programacion.fechaFinalizacionServicio = fechaActual
        await programacion.save({ transaction })

        console.log("Programación actualizada")
      } else {
        // ✅ CREATE (caso que te faltaba)
        await Programacion.create(
          {
            solicitudTramiteId: estadosTramites.solicitudTramiteId,
            fechaFinalizacionServicio: fechaActual
          },
          { transaction }
        )

        console.log("Programación creada")
      }

      await transaction.commit()

      return res.status(201).json({
        success: true,
        requiereEvaluacion: true
      })
    }

    await transaction.commit()

    return res.status(201).json({
      success: true,
      requiereEvaluacion: false
    })

  } catch (error: any) {
    await transaction.rollback()

    console.error("ERROR CREATE ESTADO:", error)

    return res.status(500).json({
      success: false,
      error: "Error al actualizar el estado del trámite",
      detalle: process.env.NODE_ENV === "development" ? error.message : undefined
    })
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