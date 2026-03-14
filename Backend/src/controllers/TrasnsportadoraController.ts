import type { Request, Response } from "express";
import Transportadora from "../models/trasnportadora";

declare global {
    namespace Express {
        interface Request {
            transportadora?: Transportadora;
        }
    }
}

export class TransportadoraController {

    static getAll = async (req: Request, res: Response) => {
        try {

            const transportadoras = await Transportadora.findAll({
                attributes: ["id", "nombreTransportadora"],
                order: [["nombreTransportadora", "ASC"]]
            });

            res.json(transportadoras);

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };


    static create = async (req: Request, res: Response) => {
        try {

            const transportadora = new Transportadora(req.body);
            await transportadora.save();

            res.status(201).json({
                msg: "Transportadora creada correctamente"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "No se puede guardar el registro"
            });
        }
    };


    static getById = async (req: Request, res: Response) => {
        res.json(req.transportadora);
    };


    static updateById = async (req: Request, res: Response) => {
        try {

            await req.transportadora.update(req.body);

            res.json({
                msg: "Transportadora actualizada"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Error actualizando"
            });
        }
    };


    static deleteById = async (req: Request, res: Response) => {
        try {

            await req.transportadora.destroy();

            res.json({
                msg: "Transportadora eliminada"
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Error eliminando"
            });
        }
    };
}