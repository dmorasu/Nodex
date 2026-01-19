import {
  Table, Column, Model, DataType,
  ForeignKey, BelongsTo
} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({ tableName:'Programacion' })
class Programacion extends Model {

  @Column({ type: DataType.DATEONLY })
  declare fechaRealizacionDiligencia: Date | null

  @Column({ type: DataType.DATE })
  declare fechaProbableEntrega: Date | null

  @Column({ type: DataType.DATE })
  declare fechaFinalizacionServicio: Date | null

   @Column({
        type:DataType.DECIMAL(12,2),
        allowNull:true

    })
    declare valorTramite: number |null

    @Column({
        type: DataType.DECIMAL(12,2),
        allowNull:true

    })
    declare valorViaticos:number | null

  @ForeignKey(()=> SolicitudTramites)
  @Column(
    {unique:true}
  )
  declare solicitudTramiteId: number

  @BelongsTo(()=> SolicitudTramites)
  declare solicitudTramite: SolicitudTramites
}

export default Programacion
