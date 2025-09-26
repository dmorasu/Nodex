import {Table, Column,DataType,BelongsTo,ForeignKey,Model,HasMany} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'

@Table({
    tableName:'Municipios'

})


class Municipios extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare nombreMunicipio:string

    @Column({
        type: DataType.STRING(100)
    })
    declare departamento:string

    @Column({
        type: DataType.STRING(100)
    })
    declare regiona:string

    @HasMany(()=>SolicitudTramites,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })
    declare solicitudTramites: SolicitudTramites

}
   
export default Municipios