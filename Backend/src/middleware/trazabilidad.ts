import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Trazabilidad from "../models/trazabilidad";

export const validateTrazabilidadExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { trazabilidadId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(trazabilidadId)
      ? trazabilidadId[0]
      : trazabilidadId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de trazabilidad inválido" });
    }

    // 4️⃣ Buscar en DB
    const trazabilidad = await Trazabilidad.findByPk(idNumber);

    if (!trazabilidad) {
      return res
        .status(404)
        .json({ error: "Dato no fue encontrado en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.trazabilidad = trazabilidad;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateTrazabilidadInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .run(req);

  await body("observacionTrazabilidad")
    .notEmpty()
    .withMessage("La observación no puede estar vacía")
    .run(req);

  next();
};

export const validateTrazabilidadId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("trazabilidadId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
