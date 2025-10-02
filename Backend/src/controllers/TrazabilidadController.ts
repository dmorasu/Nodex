import type { Request,Response } from "express";
import Trazabilidad from "../models/trazabilidad";

declare global{
    namespace Express{
        interface Request{
            trazabilidad?:Trazabilidad       
        }
    }
}

export class TrazabilidadController{
    static getAll =async (req: Request, res:Response) =>{

    }

    static create =async (req: Request, res:Response) =>{
         console.log("Desde Create Trazabilida");
         

    }


    static getById =async (req: Request, res:Response) =>{

    }

    static updateById =async (req: Request, res:Response) =>{

    }

    static deleteById =async (req: Request, res:Response) =>{

    }

}