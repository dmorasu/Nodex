import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany
} from "sequelize-typescript"

import SolicitudTramites from "./solicitudTramites"
import Usuarios from "./usuarios"
import EvaluacionRespuesta from "./evaluacionRespuestas"

@Table({
  tableName: "EvaluacionSolicitudes"
})
class EvaluacionSolicitud extends Model {

  @ForeignKey(() => SolicitudTramites)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true // 1 evaluación por solicitud
  })
  declare solicitudTramiteId: number

  @BelongsTo(() => SolicitudTramites)
  declare solicitud: SolicitudTramites

  @ForeignKey(() => Usuarios)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare usuarioId: number

  @BelongsTo(() => Usuarios)
  declare usuario: Usuarios

  @Column({
    type: DataType.FLOAT,
    allowNull: true
  })
  declare promedio: number

  @HasMany(() => EvaluacionRespuesta)
  declare respuestas: EvaluacionRespuesta[]
}

export default EvaluacionSolicitud