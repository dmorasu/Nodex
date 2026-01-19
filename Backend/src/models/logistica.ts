import{ Table,Column,Model,ForeignKey,HasMany,BelongsTo, DataType, AllowNull, HasOne} from 'sequelize-typescript'
import SolicitudTramites from './solicitudTramites'


@Table({
    tableName:'Logistica'
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
        type: DataType.TIME,
        

    })
    declare horaProgramada: string

    @Column({
        type: DataType.DATEONLY
    })
    declare fechaProgramacionLogistica:string

 

    @Column({
        type: DataType.DATEONLY,
        
    })
    declare fechaEntregaTransportadora:string

     // 🔹 FK REAL hacia SolicitudTramites
    @ForeignKey(() => SolicitudTramites)
    @Column({ unique: true }) 
    declare solicitudTramiteId: number

     @BelongsTo(()=>SolicitudTramites,{
       

      })
     declare solicitudTramites:SolicitudTramites
}   


export default Logistica