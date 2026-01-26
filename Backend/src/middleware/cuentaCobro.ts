import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import CuentaCobro from "../models/cuentaCobro";

export const validateCuentaCobroExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cuentaCobroId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(cuentaCobroId) ? cuentaCobroId[0] : cuentaCobroId;

    // 2️⃣ Convertir a número
    const idNumber = Number(id);

    // 3️⃣ Validar
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de cuenta de cobro inválido" });
    }

    // 4️⃣ Buscar en DB
    const cuentaCobro = await CuentaCobro.findByPk(idNumber);

    if (!cuentaCobro) {
      return res
        .status(404)
        .json({ error: "Dato no fue encontrado en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.cuentaCobro = cuentaCobro;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateCuentaCobroInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("numeroCuentaCobro")
    .notEmpty()
    .withMessage("El número de la cuenta de cobro no puede estar vacío")
    .run(req);

  next();
};

export const validateCuentaCobroId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("cuentaCobroId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
