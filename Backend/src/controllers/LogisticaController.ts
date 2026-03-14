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

    let logistica = await Logistica.findOne({
      where: { solicitudTramiteId: solicitudId }
    });

    if (!logistica) {

      logistica = await Logistica.create({

        solicitudTramiteId: solicitudId,

        numeroGuia: req.body.numeroGuia || null,

        valorEnvio: req.body.valorEnvio || null,

        destinatario: req.body.destinatario || null,

        transportadoraId: req.body.transportadoraId
          ? Number(req.body.transportadoraId)
          : null,

        fechaProgramacionLogistica: req.body.fechaProgramacionLogistica || null,

        fechaEntregaTransportadora: req.body.fechaEntregaTransportadora || null

      });

    } else {

      if (req.body.numeroGuia !== undefined) {
        logistica.numeroGuia = req.body.numeroGuia || null;
      }

      if (req.body.valorEnvio !== undefined) {
        logistica.valorEnvio = req.body.valorEnvio || null;
      }

      if (req.body.destinatario !== undefined) {
        logistica.destinatario = req.body.destinatario || null;
      }

      if (req.body.transportadoraId !== undefined) {
        logistica.transportadoraId = req.body.transportadoraId
          ? Number(req.body.transportadoraId)
          : null;
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

    res.status(500).json({
      error: "No se pudo almacenar la logística"
    });

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