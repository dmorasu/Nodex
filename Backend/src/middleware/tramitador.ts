import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Tramitador from "../models/tramitador";

export const validateTramitadorExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tramitadorId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(tramitadorId)
      ? tramitadorId[0]
      : tramitadorId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de tramitador inválido" });
    }

    // 4️⃣ Buscar en DB
    const tramitador = await Tramitador.findByPk(idNumber);

    if (!tramitador) {
      return res
        .status(404)
        .json({ error: "Dato no encontrado en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.tramitador = tramitador;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateTramitadorInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreTramitador")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .run(req);

  await body("region")
    .notEmpty()
    .withMessage("La región no debe estar vacía")
    .run(req);

  next();
};

export const validateTramitadorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("tramitadorId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
