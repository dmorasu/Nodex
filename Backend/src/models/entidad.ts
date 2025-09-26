import {Table,Column,BelongsTo,ForeignKey,Model,HasMany,DataType} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({
    tableName:'Entidades'


})


class Entidad extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare nombreEntidad:string


    @HasMany(()=>SolicitudTramites,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })
    declare solicitudTramites: SolicitudTramites

}


export  default Entidad