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
      // 🔹 Paginación
      const pageParam = Array.isArray(req.query.page)
        ? req.query.page[0]
        : req.query.page
      const page = pageParam ? parseInt(pageParam as string, 10) : 1
      const limit = 6
      const offset = (page - 1) * limit

      // 🔹 Búsqueda
      const searchParam = Array.isArray(req.query.search)
        ? req.query.search[0]
        : req.query.search
      const search = searchParam ? (searchParam as string).trim() : ""

      // 🔹 Filtro dinámico (si hay búsqueda)
      const where = search
        ? {
            [Op.or]: [
              { "$clientes.nombreCliente$": { [Op.like]: `%${search}%` } },
              { "$municipios.nombreMunicipio$": { [Op.like]: `%${search}%` } },
              { detalleSolicitud: { [Op.like]: `%${search}%` } },
              { id: { [Op.like]: `%${search}%` } },
            ],
          }
        : {}

      // 🔹 Consulta con Sequelize
      const { count, rows } = await SolicitudTramites.findAndCountAll({
        where,
        include: [
          {
            model: Clientes,
            as: "clientes",
            attributes: ["id", "nombreCliente"],
          },
          {
            model: Municipios,
            as: "municipios",
            attributes: ["id", "nombreMunicipio"],
          },
        ],
        limit,
        offset,
        order: [["updatedAt", "DESC"]],
      })

      // 🔹 Respuesta
      res.json({
        data: rows,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } catch (error) {
      console.error("Error al obtener solicitudes:", error)
      res.status(500).json({ message: "Error al obtener solicitudes" })
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


     static getById = async (req:Request, res:Response)=>{
        const solicitudTramites =await SolicitudTramites.findByPk(req.solicitudTramites.id, {
            include:[ Clientes,
                      Municipios,
                      Trazabilidad,
                      { 
                       
                        model:EstadosTramites,
                          include:[{
                            model:Estados, attributes:["nombreEstado"]}],
                      
                      
                      order:[["createdAt","DESC"]]
                      },
                      CuentaCobros,
                      Logistica,
                      Programacion,
                      {
                        model:Usuarios,
                        attributes:["id","nombreUsuario","correoUsuario"]
                      }]
        })
        res.json(solicitudTramites)
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