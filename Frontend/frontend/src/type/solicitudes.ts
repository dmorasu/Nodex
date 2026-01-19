import { z } from "zod"
import { SolicitudAPIRespuestaSchema } from "@/src/schemas"

export type ProgramacionType = NonNullable<
  z.infer<typeof SolicitudAPIRespuestaSchema>["programacion"]
>

export type LogisticaType = NonNullable<
  z.infer<typeof SolicitudAPIRespuestaSchema>["logistica"]
>

export type CuentaCobroType = NonNullable<
  z.infer<typeof SolicitudAPIRespuestaSchema>["cuentaCobro"]
>

export type SolicitudTramiteType = z.infer<typeof SolicitudAPIRespuestaSchema>