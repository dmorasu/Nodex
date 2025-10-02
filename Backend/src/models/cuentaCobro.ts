import {Table,Column,DataType,HasMany,Model,ForeignKey,BelongsTo} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({
    tableName:'CuentaCobros'
})

class CuentaCobros extends Model{
    
   declare valorCuentaCobro: number
    @Column({
        type:DataType.DATE


     })
     declare fechaRadicacionCuentaCobro: Date

     @Column({
        type:DataType.DATE


     })
     declare fechaMaximaPagoCuentaCobro: Date

     @Column({
        type:DataType.DATE


     })
     declare fechaPagoCuentaCobro: Date

     @Column({
        type:DataType.DATE


     })
     declare fechaRecibidaCuentaCobroTramitador: Date

     @Column({
         type:DataType.STRING(20)

     })
     declare numeroCuentaCobro:string

      @HasMany(()=>SolicitudTramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare solicitudTramites:SolicitudTramites

}

export  default CuentaCobros