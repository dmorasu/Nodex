import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Entidad from "../models/entidad";

export const validateEntidadExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { entidadId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(entidadId) ? entidadId[0] : entidadId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de entidad inválido" });
    }

    // 4️⃣ Buscar en DB
    const entidad = await Entidad.findByPk(idNumber);

    if (!entidad) {
      return res
        .status(404)
        .json({ error: "La entidad no se encuentra en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.entidad = entidad;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateEntidadInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreEntidad")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .run(req);

  next();
};

export const validateEntidadId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("entidadId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
