import{ Table,Column,Model,ForeignKey,HasMany,BelongsTo, DataType, AllowNull} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'


@Table({
    tableName:'logistica'
})

class Logistica extends Model{
    @Column({
        type:DataType.STRING(50)

    })
    declare numeroGuia:string

    @Column({
        type:DataType.DECIMAL(10,2)

    })
    declare valorEnvio:number

    @Column({
        type: DataType.DATE,
        

    })
    declare horaProgramada: string

    @Column({
        type: DataType.DATE
    })
    declare fechaProgramacionLogistica:string

    @Column({
        type: DataType.DATE
    })
    declare fechaEntregaTransportadora:string

     @HasMany(()=>SolicitudTramites,{
         onUpdate:'CASCADE',
         onDelete:'CASCADE'

      })
     declare solicitudTramites:SolicitudTramites
}   


export default Logistica