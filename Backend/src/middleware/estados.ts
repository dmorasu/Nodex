import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Estados from "../models/estados";

export const validateEstadosExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { estadosId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(estadosId) ? estadosId[0] : estadosId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de estado inválido" });
    }

    // 4️⃣ Buscar en DB
    const estados = await Estados.findByPk(idNumber);

    if (!estados) {
      return res
        .status(404)
        .json({ error: "El estado no se encuentra en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.estados = estados;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateEstadosInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreEstado")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .run(req);

  next();
};

export const validateEstadosId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("estadosId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
