import { ExpressValidator } from 'express-validator'
import {Table,Column,Model,DataType,ForeignKey,BelongsTo} from 'sequelize-typescript'
import Solicitantes from './solicitantes'

@Table({
    tableName:'Tramites'

})

class Tramites extends Model{
     @Column({
        type:DataType.DATE

     })
     
     declare fechaAsignacion: Date
     
     @Column({
        type:DataType.DATE


     })
     declare fechaDiligenciamiento:Date

     @Column({
        type:DataType.DATE


     })
     declare fechaEntregaResultado: Date

     @Column({
        type:DataType.STRING(100)
     })
     declare tipoTramite:String

     @Column({
        type:DataType.STRING(100)
     })
     declare estadoTramite:String


     @ForeignKey(()=>Solicitantes)
     declare solicitanteId:number

     // Declaracoin de una relacion con otra Tabla o Modelo
     @BelongsTo(()=>Solicitantes)
     declare solicitante:Solicitantes


}

export default Tramites