import {Table,Column,DataType,Model,ForeignKey,BelongsTo, AllowNull} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'


@Table({
    tableName:'Trazabilidad'

})

class Trazabilidad extends Model{
    @Column({
        type: DataType.TEXT
    })
    declare observacionTrazabilidad:string

    @Column({
        type:DataType.STRING(100)
    })
    declare nombreUsuario:string

     @ForeignKey(()=>SolicitudTramites)
     @Column({
        allowNull:false
     })
     declare solicitudTramiteId:number

     @BelongsTo(()=>SolicitudTramites)
     declare solicitudTramites:SolicitudTramites
}

export default Trazabilidad