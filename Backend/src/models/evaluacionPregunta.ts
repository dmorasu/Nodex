import {
  Table,
  Column,
  Model,
  DataType,
  HasMany
} from "sequelize-typescript"

import EvaluacionRespuesta from "./evaluacionRespuestas"

@Table({
  tableName: "EvaluacionPreguntas"
})
class EvaluacionPregunta extends Model {

  @Column({
    type: DataType.STRING(300),
    allowNull: false
  })
  declare texto: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare orden: number

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  declare activa: boolean

  @HasMany(() => EvaluacionRespuesta)
  declare respuestas: EvaluacionRespuesta[]
}

export default EvaluacionPregunta