import type { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import Cliente from "../models/clientes";

export const validateClienteExits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clienteId } = req.params;

    // 1️⃣ Normalizar (string | string[])
    const id = Array.isArray(clienteId) ? clienteId[0] : clienteId;

    // 2️⃣ Convertir a número
    const idNumber = Number(id);

    // 3️⃣ Validar
    if (isNaN(idNumber)) {
      return res.status(400).json({ error: "ID de cliente inválido" });
    }

    // 4️⃣ Buscar en DB
    const cliente = await Cliente.findByPk(idNumber);

    if (!cliente) {
      return res
        .status(404)
        .json({ error: "El cliente no se encuentra en la base de datos" });
    }

    req.cliente = cliente;
    next();

  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};

export const validateClienteInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await body("nombreCliente")
    .notEmpty()
    .withMessage("El Nombre no puede estar vacío")
    .run(req);

  await body("identificacionCliente")
    .notEmpty()
    .withMessage("Debe ingresar una identificación")
    .run(req);

  await body("telefono")
    .notEmpty()
    .withMessage("Debe ingresar un número telefónico")
    .run(req);

  await body("telefonoMovil")
    .notEmpty()
    .withMessage("Debe ingresar un número telefónico móvil")
    .run(req);

  next();
};
