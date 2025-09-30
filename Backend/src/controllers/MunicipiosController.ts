import type {Request,Response} from 'express'
import Municipio from '../models/municipios'

declare global{
    namespace Express{
        interface Request{
            municipio?:Municipio
        }
    }
}

export class MunicipioController{


    static getAll =async(req:Request, res:Response)=>{
        try {
                const municipio=await Municipio.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],
                })
                res.json(municipio)
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Error al consultar todos los municipios'})
            
        }
    }

    static create  =async(req:Request,res:Response)=>{
        try {
                const municipio= new Municipio(req.body)
                await municipio.save()
                res.status(201).json('municipio almacenado correctamente')

        } catch (error) {
            res.status(500).json({error:"No se pudo almacenar el municipio"})
            //console.log(error);
            
            
        }
    }

    static getById =  async (req:Request,res:Response)=>{
        res.json(req.municipio)
    }

    static updateById =async (req:Request,res:Response)=>{
        await req.municipio.update(req.body)
        res.json('Municipio Actualizado')
    }

    static deleteById =async(req:Request,res:Response)=>{
        await req.municipio.destroy()
        res.json('Municipio Eliminado')
    }

}