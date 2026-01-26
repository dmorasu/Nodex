import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Logistica from "../models/logistica";

export const validateLogisticaExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { logisticaId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(logisticaId) ? logisticaId[0] : logisticaId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de logística inválido" });
    }

    // 4️⃣ Buscar en DB
    const logistica = await Logistica.findByPk(idNumber);

    if (!logistica) {
      return res
        .status(404)
        .json({ error: "Dato no fue encontrado en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.logistica = logistica;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateLogisticaInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("numeroGuia")
    .notEmpty()
    .withMessage("La guía no puede estar vacía")
    .run(req);

  next();
};

export const validateLogisticaId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("logisticaId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
