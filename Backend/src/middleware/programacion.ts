import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Programacion from "../models/programacion";

export const validateProgramacionExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { programacionId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(programacionId)
      ? programacionId[0]
      : programacionId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de programación inválido" });
    }

    // 4️⃣ Buscar en DB
    const programacion = await Programacion.findByPk(idNumber);

    if (!programacion) {
      return res
        .status(404)
        .json({ error: "Dato no fue encontrado en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.programacion = programacion;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateProgramacionInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("fechaProbableEntrega")
    .notEmpty()
    .withMessage("La fecha probable de entrega no puede estar vacía")
    .run(req);

  next();
};

export const validateProgramacionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("programacionId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
