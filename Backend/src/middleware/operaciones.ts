import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Operaciones from "../models/operaciones";

export const validateOperacionesExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { operacionesId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(operacionesId) ? operacionesId[0] : operacionesId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de operación inválido" });
    }

    // 4️⃣ Buscar en DB
    const operaciones = await Operaciones.findByPk(idNumber);

    if (!operaciones) {
      return res
        .status(404)
        .json({ error: "La operación no se encuentra en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.operaciones = operaciones;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateOperacionesInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreOperacion")
    .notEmpty()
    .withMessage("El nombre de la operación no puede estar vacío")
    .run(req);

  next();
};

export const validateOperacionesId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("operacionesId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};