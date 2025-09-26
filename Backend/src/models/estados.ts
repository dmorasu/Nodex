import {Table,Column,BelongsTo,ForeignKey,Model,HasMany,DataType} from 'sequelize-typescript'
import EstadosTramites from './estadosTramites'


@Table({
    tableName:'Estados'


})


class Estados extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare nombreEstado:string

    @HasMany(()=>EstadosTramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare estadoTramites:EstadosTramites

    

}


export  default Estados