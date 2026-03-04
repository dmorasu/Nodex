import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript"

import EvaluacionSolicitud from "./evaluacionSolicitud"
import EvaluacionPregunta from "./evaluacionPregunta"

@Table({
  tableName: "EvaluacionRespuestas"
})
class EvaluacionRespuesta extends Model {

  @ForeignKey(() => EvaluacionSolicitud)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare evaluacionSolicitudId: number

  @BelongsTo(() => EvaluacionSolicitud)
  declare evaluacion: EvaluacionSolicitud

  @ForeignKey(() => EvaluacionPregunta)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare preguntaId: number

  @BelongsTo(() => EvaluacionPregunta)
  declare pregunta: EvaluacionPregunta

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4
    }
  })
  declare calificacion: number
}

export default EvaluacionRespuesta