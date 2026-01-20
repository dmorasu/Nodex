// models/tramite.ts
import {Table,Column,Model,HasMany,DataType} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({ tableName:'Tramites' })
class Tramite extends Model {

  @Column({ type:DataType.STRING(150) })
  declare nombreTramite:string

  @HasMany(()=>SolicitudTramites)
  declare solicitudes: SolicitudTramites[]
}

export default Tramite
