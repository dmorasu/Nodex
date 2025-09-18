import {Table, Column,DataType,HasMany,BelongsTo,ForeignKey, Model} from 'sequelize-typescript'
import Tramites from './tramites'

@Table({
    tableName:'Solicitantes'
})

class Solicitantes extends Model{
     @Column({
        type:DataType.STRING

     })
     
     declare nombre: string

      @Column({
        type:DataType.STRING

     })
     
     declare prefijo: string

     @HasMany(()=>Tramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare tramite:Tramites
}

export default Solicitantes