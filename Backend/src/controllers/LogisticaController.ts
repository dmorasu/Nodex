import type {Request,Response} from 'express'
import Logistica from '../models/logistica'

declare global{
    namespace Express{
        interface Request{
            logistica?:Logistica
        }
    }
}

export class LogisticaController{


    static getAll =async(req:Request, res:Response)=>{
        try {
                const logistica=await Logistica.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],
                })
                res.json(logistica)
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Error al consultar todos los logisticas'})
            
        }
    }

    static create = async (req: Request, res: Response) => {
  try {
    const solicitudId = req.solicitudTramites.id; 
    // (asumo que ya estás inyectando req.solicitudTramites desde middleware)

    // Buscar si ya existe logística para esta solicitud
    let logistica = await Logistica.findOne({
      where: { solicitudTramiteId: solicitudId }
    });

    if (!logistica) {
      // Crear si no existe
      logistica = await Logistica.create({
        solicitudTramiteId: solicitudId,
        numeroGuia: req.body.numeroGuia || null,
        valorEnvio: req.body.valorEnvio || null,
        horaProgramada: req.body.horaProgramada || null,
        fechaProgramacionLogistica: req.body.fechaProgramacionLogistica || null,
        fechaEntregaTransportadora: req.body.fechaEntregaTransportadora || null
      });
    } else {
      // Actualizar solo los campos enviados

      if (req.body.numeroGuia !== undefined) {
        logistica.numeroGuia = req.body.numeroGuia || null;
      }

      if (req.body.valorEnvio !== undefined) {
        logistica.valorEnvio = req.body.valorEnvio || null;
      }

      if (req.body.horaProgramada !== undefined) {
        logistica.horaProgramada = req.body.horaProgramada || null;
      }

      if (req.body.fechaProgramacionLogistica !== undefined) {
        logistica.fechaProgramacionLogistica = req.body.fechaProgramacionLogistica || null;
      }

      if (req.body.fechaEntregaTransportadora !== undefined) {
        logistica.fechaEntregaTransportadora = req.body.fechaEntregaTransportadora || null;
      }

      await logistica.save();
    }

    res.status(201).json("Logística guardada correctamente");

  } catch (error) {
    console.error("ERROR LOGISTICA:", error);
    res.status(500).json({ error: "No se pudo almacenar la logística" });
  }
};

    static getById =  async (req:Request,res:Response)=>{
        res.json(req.logistica)
    }

    static updateById =async (req:Request,res:Response)=>{
        await req.logistica.update(req.body)
        res.json('logistica Actualizado')
    }

    static deleteById =async(req:Request,res:Response)=>{
        await req.logistica.destroy()
        res.json('logistica Eliminado')
    }

}