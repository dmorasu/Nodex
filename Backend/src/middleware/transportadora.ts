import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Transportadora from "../models/trasnportadora";

declare global {
  namespace Express {
    interface Request {
      transportadora?: Transportadora;
    }
  }
}

/*
---------------------------------------
VALIDAR ID DE TRANSPORTADORA
---------------------------------------
*/
export const validateTransportadoraId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("traId")
    .isInt({ gt: 0 })
    .withMessage("ID de transportadora no válido")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errores: errors.array(),
    });
  }

  next();
};

/*
---------------------------------------
VALIDAR INPUT
---------------------------------------
*/
export const validateTransportadoraInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreTransportadora")
    .notEmpty()
    .withMessage("El nombre de la transportadora es obligatorio")
    .isLength({ min: 2, max: 120 })
    .withMessage("El nombre debe tener entre 2 y 120 caracteres")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errores: errors.array(),
    });
  }

  next();
};

/*
---------------------------------------
VALIDAR QUE EXISTE LA TRANSPORTADORA
---------------------------------------
*/
export const validateTransportadoraExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { traId } = req.params;

    const id = Array.isArray(traId) ? traId[0] : traId;

    const idNumber = Number(id);

    if (isNaN(idNumber)) {
      return res.status(400).json({
        error: "ID de transportadora inválido",
      });
    }

    const transportadora = await Transportadora.findByPk(idNumber);

    if (!transportadora) {
      return res.status(404).json({
        error: "La transportadora no existe",
      });
    }

    // Adjuntar al request
    req.transportadora = transportadora;

    next();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error en el servidor",
    });
  }
};