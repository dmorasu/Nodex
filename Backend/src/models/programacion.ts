import {
  Table, Column, Model, DataType,
  ForeignKey, BelongsTo
} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({ tableName:'Programacion' })
class Programacion extends Model {

  @Column({ type: DataType.DATE })
  declare fechaRealizacionDiligencia: Date | null

  @Column({ type: DataType.DATE })
  declare fechaProbableEntrega: Date | null

  @Column({ type: DataType.DATE })
  declare fechaFinalizacionServicio: Date | null

  @ForeignKey(()=> SolicitudTramites)
  @Column(
    {unique:true}
  )
  declare solicitudTramitesId: number

  @BelongsTo(()=> SolicitudTramites)
  declare solicitudTramite: SolicitudTramites
}

export default Programacion
