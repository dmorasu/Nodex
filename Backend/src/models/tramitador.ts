import { Table, Column, DataType, HasMany, Model } from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({
  tableName: 'Tramitador'
})
class Tramitador extends Model {

  @Column({
    type: DataType.STRING(200),
    allowNull: false
  })
  declare nombreTramitador: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  declare identificacion: string

  @Column({
    type: DataType.STRING(150),
    allowNull: false
  })
  declare correoTramitador: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  declare activo: boolean

  @Column({
    type: DataType.STRING(100)
  })
  declare region: string

  @Column({
    type: DataType.STRING(20)
  })
  declare numeroTramitador: string

  @HasMany(() => SolicitudTramites, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  declare solicitudesTramites: SolicitudTramites[]
}

export default Tramitador
