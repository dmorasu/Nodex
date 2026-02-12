import Usuarios from "../models/usuarios"

export {}

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuarios
    }
  }
}
