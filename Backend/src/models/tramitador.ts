import {Table,Column,ForeignKey,DataType,HasMany,Model,BelongsTo} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'


@Table({
    tableName:'Tramitador'
})

class Tramitador extends Model{

    @Column({
        type:DataType.STRING(200)
    })
    declare nombreTramitador:string

    @Column({
        type: DataType.STRING(100)

    })
    declare region:string

    @Column({
        type:DataType.STRING(10)
    })
    declare numeroTramitador:string

    @HasMany(()=>SolicitudTramites,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE'

    })
    declare solicitudesTramites:SolicitudTramites
}

export default Tramitador