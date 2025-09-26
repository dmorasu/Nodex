import {Table,Column,DataType,HasMany,Model,ForeignKey,BelongsTo} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({
    tableName:'Clientes'
})

class Clientes extends Model{
    
    @Column({
        type:DataType.STRING(255)


    })
    declare nombreCliente:String

    @Column({
        type:DataType.STRING(20)
    })
    declare identificacionCliente:string

    @Column({
        type:DataType.STRING(10)

    })
    declare telefono:string

    @Column({
        type:DataType.STRING(10)
    })
    declare telefonoMovil:string


    @HasMany(()=>SolicitudTramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare solicitudTramites:SolicitudTramites
}

export default Clientes