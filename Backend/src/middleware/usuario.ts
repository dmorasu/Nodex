import type { Request, Response, NextFunction } from "express";
import { param, validationResult, body } from "express-validator";
import Usuario from "../models/usuarios";

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuario;
    }
  }
}

export const validateUsuarioId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param("usuarioId")
    .isInt({ gt: 0 })
    .withMessage("ID no válido")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateUsuarioExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usuarioId } = req.params;

    // 1️⃣ Normalizar string | string[]
    const id = Array.isArray(usuarioId) ? usuarioId[0] : usuarioId;

    // 2️⃣ Convertir a number
    const idNumber = Number(id);

    // 3️⃣ Validar ID
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    // 4️⃣ Buscar en DB
    const usuario = await Usuario.findByPk(idNumber);

    if (!usuario) {
      return res
        .status(404)
        .json({ error: "El usuario no se encuentra en la base de datos" });
    }

    // 5️⃣ Adjuntar al request
    req.usuario = usuario;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateUsuarioInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .run(req);

  await body("correoUsuario")
    .notEmpty()
    .withMessage("El correo no puede estar vacío")
    .isEmail()
    .withMessage("Debe ingresar un correo válido")
    .run(req);

  next();
};
