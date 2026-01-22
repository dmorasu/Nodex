import type {Request, Response} from 'express'
import SolicitudTramites from '../models/solicitudTramites'
import Trazabilidad from '../models/trazabilidad'
import EstadosTramites from '../models/estadosTramites'
import CuentaCobros from '../models/cuentaCobro'
import Logistica from '../models/logistica'
import Programacion from '../models/programacion'
import Clientes from '../models/clientes'
import Municipios from '../models/municipios'
import {Op} from 'sequelize'
import Estados from '../models/estados'
import Usuarios from '../models/usuarios'
import { CreatedAt } from 'sequelize-typescript'
import Entidad from '../models/entidad'
import Operaciones from '../models/operaciones'
import Tramite from '../models/tramite'
import Tramitador from '../models/tramitador'



declare global{
    namespace Express{
        interface Request{
            solicitudTramites?:SolicitudTramites
        }
    }
}


export class SolicitudTramitesController{


static obtenerSolicitudes = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit

    const search = (req.query.search as string)?.trim()
    const estado = (req.query.estado as string)?.trim()
    const fechaInicio = req.query.fechaInicio as string
    const fechaFin = req.query.fechaFin as string

    const where:any = {}

    // 🔹 ID Solicitud o Identificación Cliente
    if (search) {
      where[Op.or] = [
        { id: { [Op.eq]: search } },
        { "$clientes.identificacionCliente$": { [Op.eq]: search } }
      ]
    }

    // 🔹 Rango de fechas (createdAt)
    if (fechaInicio && fechaFin) {
      where.createdAt = {
        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
      }
    }

    // 🔹 Filtro por Estado
    if (estado) {
      if (estado === "Sin Iniciar") {
        where[Op.or] = [
          { "$estadosTramites.estado.nombreEstado$": "Sin Iniciar" },
          { "$estadosTramites.id$": null }
        ]
      } else {
        where["$estadosTramites.estado.nombreEstado$"] = estado
      }
    }

    const { count, rows } = await SolicitudTramites.findAndCountAll({
      where,
      include: [
        {
          model: Clientes,
          attributes: ["id","nombreCliente","identificacionCliente"]
        },
        {
          model: Municipios,
          attributes: ["id","nombreMunicipio"]
        },
        {
          model: Usuarios,
          attributes:["id","nombreUsuario"]
        },
        {
          model: EstadosTramites,
          as: "estadosTramites",
          required: false, // permite trámites sin estado
          include: [{ model: Estados, attributes:["nombreEstado"] }],
          order: [["createdAt","DESC"]],
          limit: 1   // 👈 solo último estado
        }
      ],
      order: [["createdAt","DESC"]],
      limit,
      offset,
      distinct: true
    })

    res.json({
      data: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al obtener solicitudes" })
  }
}

static asignarTramitador = async (req: Request, res: Response) => {
  try {
    const { tramitadorId } = req.body

    if (!tramitadorId) {
      return res.status(400).json({ error: 'Debe enviar tramitadorId' })
    }

    // req.solicitudTramites ya viene cargado por middleware
    req.solicitudTramites.tramitadorId = tramitadorId
    await req.solicitudTramites.save()

    res.status(201).json( 'Tramitador asignado correctamente' )


  } catch (error) {
    console.log(error);
    res.status(500).json('No se puede guardar el registro')
  }
}
   
static getAll = async (req: Request, res: Response) => {
  try {
    const solicitudTramites = await SolicitudTramites.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {


          model: EstadosTramites,
          as:'estadosTramites',
         
              
         
          include: [
            {
              model: Estados,
              attributes: ['nombreEstado'], // 👈 solo queremos el nombre del estado
              as:'estado'
            },
          ],
          separate: true, // 👈 importante si quieres traer todos los registros correctamente
          order: [['createdAt', 'DESC']],
          
        },
        {
          model: Clientes,
          attributes: ['id', 'nombreCliente'],
        },
        {
          model: Municipios,
          attributes: ['id', 'nombreMunicipio'],
        },
        {
          model: Usuarios,
          attributes: ['id', 'nombreUsuario','correoUsuario'],
        },
      ],
    });

    res.json(solicitudTramites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener las solicitudes' });
  }
};

     static create= async (req:Request, res:Response)=>{

         try {
                const solicitudTramites= new SolicitudTramites(req.body)
                await solicitudTramites.save()
                res.status(201).json("Dato ingresado correctamente")
        } catch (error) {
              console.log(error);
              res.status(500).json({error:'No se puede guardar el registro'})
            
        }

       
    }


     static getById = async (req: Request, res: Response) => {
  try {
    const solicitudTramites = await SolicitudTramites.findByPk(
      req.solicitudTramites.id,
      {
        include: [
          Clientes,
          Municipios,

          {
            model: Trazabilidad,
            separate: true,
            order: [["createdAt", "DESC"]],
            limit: 20
          },

          {
            model: EstadosTramites,
            include: [{
              model: Estados,
              attributes: ["nombreEstado"]
            }],
            order: [["createdAt", "DESC"]]
          },

          // 🔹 Relaciones 1–1 ya corregidas
          {
            model: Programacion
          },
          {
            model: Logistica
          },
          {
            model: CuentaCobros
          },

          {
            model: Usuarios,
            attributes: ["id", "nombreUsuario", "correoUsuario"]
          },
          {
            model:Entidad,
            attributes:["id","nombreEntidad"]

          },
          {
            model:Operaciones,
            attributes:['id','nombreOperacion',"centroDeCostos"]

          },
          {
            model:Tramite,
            attributes:['id','nombreTramite']
          },
          {
            model:Tramitador,
            attributes:['id','nombreTramitador']
          }
        ]
      }
    )

    res.json(solicitudTramites)

  } catch (error) {
    console.error("ERROR GET SOLICITUD:", error)
    res.status(500).json({ error: error.message })
  }
}


     static updateById = async (req:Request, res:Response)=>{
        await req.solicitudTramites.update(req.body)
        res.json('Solicitud Actualizada')
    }

     static deleteById= async (req:Request, res:Response)=>{
        await req.solicitudTramites.destroy()
        res.json('tarifa Eliminada')
        
    }
}