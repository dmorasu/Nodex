import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import EstadosTramites from "../models/estadosTramites";

export const validateEstadosTramitesExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { estadosTramitesId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(estadosTramitesId)
      ? estadosTramitesId[0]
      : estadosTramitesId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de estado trámite inválido" });
    }

    // 4️⃣ Buscar en DB
    const estadosTramites = await EstadosTramites.findByPk(idNumber);

    if (!estadosTramites) {
      return res
        .status(404)
        .json({ error: "Dato no fue encontrado en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.estadosTramites = estadosTramites;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateEstadosTramitesInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("estadoId")
    .notEmpty()
    .withMessage("Debe registrar un estado")
    .run(req);

  await body("solicitudTramiteId")
    .notEmpty()
    .withMessage("Debe registrar un ID de solicitud de trámite")
    .run(req);

  next();
};

export const validateEstadosTramitesId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("estadosTramitesId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
