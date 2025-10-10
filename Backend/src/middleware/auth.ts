import type { Request,Response,NextFunction } from "express"
import jwt from  'jsonwebtoken'
import Usuarios from "../models/usuarios";

export const autenticacion  = async (req:Request,res:Response,next:NextFunction)=>{
    const  bearer =req.headers.authorization
        if(!bearer){
            const error =new Error('Usuario no autorizado')
            return res.status(401).json({error:error.message})
        }

        const [,token]=bearer.split(' ')
        if(!token){
            const error =new Error('Token no autorizado')
            return res.status(401).json({error:error.message})
        }
        

        try {
            const decode= jwt.verify(token,process.env.JWT_SECRET)
            if(typeof decode ==="object" && decode.id){
                req.usuario=await  Usuarios.findByPk(decode.id,{
                    attributes:['id','nombreUsuario','correoUsuario']
                })
                next()

            }
            


            
        } catch (error) {
            res.status(500).json({error:'Token no valido'})
        }

}