import {Table, Column,DataType,HasMany,BelongsTo,ForeignKey, Model, Unique} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'


@Table({
    tableName:'Usuarios'
})

class Usuarios extends Model{
     @Column({
        type:DataType.STRING(100)

     })
     
     declare nombreUsuario: string

      @Column({
        type:DataType.STRING(100)

     })
     
     declare contrasena: string

     @Unique(true)
     @Column({
        type:DataType.STRING(100)

     })
     
     declare correoUsuario: string
     

     @Column({
        type:DataType.STRING(100)

     })
     
     declare area: string

     @HasMany(()=>SolicitudTramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare solicitudTramites:SolicitudTramites
}

export default Usuarios