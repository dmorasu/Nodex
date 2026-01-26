import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Tarifa from "../models/tarifa";

export const validateTarifaExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tarifaId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(tarifaId) ? tarifaId[0] : tarifaId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de tarifa inválido" });
    }

    // 4️⃣ Buscar en DB
    const tarifa = await Tarifa.findByPk(idNumber);

    if (!tarifa) {
      return res
        .status(404)
        .json({ error: "La tarifa no se encuentra en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.tarifa = tarifa;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateTarifaInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreTarifa")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .run(req);

  await body("valorTarifa")
    .notEmpty()
    .withMessage("El valor no puede estar vacío")
    .isInt({ gt: 0 })
    .withMessage("El valor debe ser numérico y mayor a 0")
    .run(req);

  next();
};

export const validateTarifaId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("tarifaId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
