import {Table, Column,DataType,HasMany,BelongsTo,ForeignKey, Model} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'
import { ExpressValidator } from 'express-validator'

@Table({
    tableName:'Tarifa'
})

class Tarifa extends Model{
    @Column({
        type:DataType.STRING(100)
    })
    declare nombreTarifa:string


    @Column({
        type:DataType.DECIMAL(10,2)

    })
    declare valorTarifa: number


    @HasMany(()=>SolicitudTramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare solicitudTramites:SolicitudTramites
}

export default Tarifa