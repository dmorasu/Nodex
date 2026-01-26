import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Tramite from "../models/tramite";

export const validateTramitesExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tramiteId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(tramiteId) ? tramiteId[0] : tramiteId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de trámite inválido" });
    }

    // 4️⃣ Buscar en DB
    const tramite = await Tramite.findByPk(idNumber);

    if (!tramite) {
      return res
        .status(404)
        .json({ error: "El trámite no se encuentra en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.tramite = tramite;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateTramitesInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreOperacion")
    .notEmpty()
    .withMessage("El nombre del trámite no puede estar vacío")
    .run(req);

  next();
};

export const validateTramiteId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("tramiteId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
