import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Municipios from "../models/municipios";

export const validateMunicipioExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { municipioId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(municipioId) ? municipioId[0] : municipioId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de municipio inválido" });
    }

    // 4️⃣ Buscar en DB
    const municipio = await Municipios.findByPk(idNumber);

    if (!municipio) {
      return res
        .status(404)
        .json({ error: "El municipio no se encuentra en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.municipio = municipio;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateMunicipioInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreMunicipio")
    .notEmpty()
    .withMessage("El nombre del municipio no puede estar vacío")
    .run(req);

  await body("departamento")
    .notEmpty()
    .withMessage("El nombre del departamento no puede estar vacío")
    .run(req);

  await body("regional")
    .notEmpty()
    .withMessage("La región no puede estar vacía")
    .run(req);

  next();
};

export const validateMunicipioId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("municipioId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  next();
};
