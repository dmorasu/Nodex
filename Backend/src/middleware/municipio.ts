import type {Request,Response,NextFunction} from 'express'
import Municipios from '../models/municipios'
import  {param, validationResult, body} from 'express-validator'


export const  validateMunicipioExits= async(req:Request,res:Response,next:NextFunction)=>{
        
        try {
            const{municipioId}=req.params
            const municipio=await  Municipios.findByPk(municipioId)
            if(!municipio){
                const error =new Error('La municipio no se encuentra en la base de datos')
                return res.status(404).json({error:error.message})
            }
            req.municipio=municipio

            next()

    

        } catch (error) {
            //console.log(error);
            res.status(500).json({error:'Hubo un error'})

            
            
        }
    
}

export const  validateMunicipioInput =async(req:Request,res:Response,next:NextFunction)=>{
        await body('nombreMunicipio').notEmpty().withMessage('El Nombre del municipio no puede estar vacio').run(req)
        await body('departamento').notEmpty().withMessage('El Nombre del departamento no puede estar vacio').run(req)
        await body('regional').notEmpty().withMessage('ELa region no puede estar vacio').run(req)
        
        
        
        
    next()



}