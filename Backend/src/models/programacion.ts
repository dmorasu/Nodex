import {Table,Column,ForeignKey,HasMany, Model, DataType,} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({
    tableName:'Programacion'
})

class Programacion extends Model{
    @Column({
        type: DataType.DATE
    })
    declare fechaRealizacionDiligencia:Date

    @Column({
        type:  DataType.DATE
    })
    declare fechaProbableEntrega:Date

    @Column({
        type: DataType.DATE
    })
    declare fechaFinalizacionServicio:Date

    
    @HasMany(()=>SolicitudTramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare solicitudTramitesId:SolicitudTramites


}

export default Programacion