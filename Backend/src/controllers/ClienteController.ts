import type {Request,Response} from 'express'
import Cliente from '../models/clientes'

declare global{
    namespace Express{
        interface Request{
            cliente?:Cliente
        }
    }
}

export class ClienteController{


    static getAll =async(req:Request, res:Response)=>{
        try {
                const cliente=await Cliente.findAll({
                    order:[
                        ['createdAt','DESC']
                    ],
                })
                res.json(cliente)
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'Error al consultar todos los clientes'})
            
        }
    }

    static create  =async(req:Request,res:Response)=>{
        try {
                const cliente= new Cliente(req.body)
                await cliente.save()
                res.status(201).json('Cliente almacenado correctamente')

        } catch (error) {
            res.status(500).json({error:"No se pudo almacenar el cliente"})
            //console.log(error);
            
            
        }
    }

    static getById =  async (req:Request,res:Response)=>{
        res.json(req.cliente)
    }

    static updateById =async (req:Request,res:Response)=>{
        await req.cliente.update(req.body)
        res.json('Cliente Actualizado')
    }

    static deleteById =async(req:Request,res:Response)=>{
        await req.cliente.destroy()
        res.json('Cliente Eliminado')
    }

}