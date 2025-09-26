import {Table,Column,Model,DataType,ForeignKey,BelongsTo} from 'sequelize-typescript'
import Estados from './estados'
import SolicitudTramites from './solicitudTramites'



@Table({
    tableName:'EstadosTramites'
})


class EstadosTramites extends Model{
    @ForeignKey(()=>Estados)
     declare estadoId:number

     @BelongsTo(()=>Estados)
     declare estado:Estados

     @ForeignKey(()=>SolicitudTramites)
     declare solicitudTramiteId:number

     @BelongsTo(()=>SolicitudTramites)
     declare solicitudTramites:SolicitudTramites


    
}

export default EstadosTramites