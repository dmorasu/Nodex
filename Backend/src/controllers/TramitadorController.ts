import type {Request,Response} from 'express'
import Tramitador from '../models/tramitador'
import { Op,Sequelize } from 'sequelize'

declare global{
    namespace Express{
        interface Request{
            tramitador?:Tramitador       
        }
    }
}

export class TramitadorController{
    static getAll =async (req:Request,res:Response) =>{
        try {
                const tramitador=  await Tramitador.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],

                })
                res.json(tramitador)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Hubo un error'})
            
        }
    }

    static create =async(req:Request,  res: Response)=>{
        try {
                const tramitador= new Tramitador(req.body)
                await tramitador.save()
                res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
              console.log(error);
            //res.status(500).json({error:'No se puede guardar el registro'})
            
        }
    }

   static search = async (req: Request, res: Response) => {
  try {
    const search = req.query.search?.toString().trim() || ''
    const limit = Number(req.query.limit) || 20

    if (search.length < 2) {
      return res.json([])
    }

    const tramitadores = await Tramitador.findAll({
      where: {
        activo: true,   // ✅ filtro booleano correcto
        nombreTramitador: {
          [Op.iLike]: `%${search}%`
        }
      },
      order: [
        [Sequelize.literal(`"nombreTramitador" ILIKE '${search}%'`), 'DESC'],
        ['nombreTramitador', 'ASC']
      ],
      limit
    })

    res.json(tramitadores)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error buscando tramitadores' })
  }
}


    static getById= async (req:Request,res:Response)=>{
        
         res.json(req.tramitador)

    
    }
     static updateById= async (req:Request,res:Response)=>{
        await req.tramitador.update(req.body)
        res.json('Registro Actualizado')
    
    }
    
     static deleteById= async (req:Request,res:Response)=>{
           await req.tramitador.destroy()
            res.json('Registro Eliminado')
    
    }
}

