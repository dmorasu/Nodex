// middleware/auth.ts
import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import Usuarios from "../models/usuarios"

export const autenticacion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // 🔐 1. Intentar leer desde cookie (IMPORTANTE: nombre exacto)
  let token = req.cookies?.TOKEN || req.cookies?.token

  // 🔐 2. Si no existe en cookie, intentar header Authorization
  if (!token && req.headers.authorization) {
    const [, headerToken] = req.headers.authorization.split(" ")
    token = headerToken
  }

  if (!token) {
    return res.status(401).json({
      message: "Usuario no autorizado",
      totalProcesados: 0,
      creados: [],
      errores: []
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    if (typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({
        message: "Token inválido",
        totalProcesados: 0,
        creados: [],
        errores: []
      })
    }

    const usuario = await Usuarios.findByPk(decoded.id, {
      attributes: ["id", "nombreUsuario", "correoUsuario"]
    })

    if (!usuario) {
      return res.status(401).json({
        message: "Usuario no existe",
        totalProcesados: 0,
        creados: [],
        errores: []
      })
    }

    req.usuario = usuario
    next()

  } catch (error) {
    return res.status(401).json({
      message: "Token no válido",
      totalProcesados: 0,
      creados: [],
      errores: []
    })
  }
}
