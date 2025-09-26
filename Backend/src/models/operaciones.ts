import {Table,ForeignKey,Model,Column,BelongsTo,HasMany, DataType} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'


@Table({
    tableName:'Operaciones'
})

class Operaciones extends Model{

    @Column({
        type: DataType.STRING(100)
    })

    declare nombreOperacion:string


    @HasMany(()=>SolicitudTramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare solicitudTramites:SolicitudTramites

}


export  default Operaciones