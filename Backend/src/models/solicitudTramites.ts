import { ExpressValidator } from 'express-validator'
import {Table,Column,Model,DataType,ForeignKey,BelongsTo,HasMany} from 'sequelize-typescript'
import Usuarios from './usuarios'
import Tarifa from './tarifa'
import Clientes from './clientes'
import Tramitador from './tramitador'
import Logistica from './logistica'
import Programacion from './programacion'
import Operaciones from './operaciones'
import Entidad from './entidad'
import Municipios from './municipios'
import EstadosTramites from './estadosTramites'
import Trazabilidad from './trazabilidad'

@Table({
    tableName:'SolicitudTramites'

})

class SolicitudTramites extends Model{
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
     declare matriculaInmobiliaria:string

     @Column({
         type:DataType.TEXT

     })
     declare detalleSolicitud:string

      @Column({
         type:DataType.STRING(20)

     })
     declare placa:string

     @Column({
         type:DataType.STRING(20)

     })
     declare tipoServicio:string

       @Column({
         type:DataType.STRING(100)

     })
     declare direccionTramite:string

     @Column({
         type:DataType.STRING(20)

     })
     declare centroCostos:string

     @Column({
         type:DataType.TEXT

     })
     declare documentosAportados:string

     @Column({
        type:DataType.DECIMAL(10,2)

    })
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

     @ForeignKey(()=>Usuarios)
     declare usuarioId:number

     // Declaracoin de una relacion con otra Tabla o Modelo
     @BelongsTo(()=> Usuarios)
     declare usuario:Usuarios
     
     @ForeignKey(()=>Tarifa)
     declare tarifaId:number

     // Declaracoin de una relacion con otra Tabla o Modelo
     @BelongsTo(()=> Tarifa)
     declare tarifa:Tarifa

      @ForeignKey(()=>Clientes)
     declare clienteId:number

     // Declaracoin de una relacion con otra Tabla o Modelo
     @BelongsTo(()=> Clientes)
     declare clientes:Clientes

     @ForeignKey(()=>Tramitador)
     declare tramitadorId:number

     @BelongsTo(()=>Tramitador)
     declare tramitador:Tramitador

      @ForeignKey(()=>Logistica)
     declare logisticaId:number

     @BelongsTo(()=>Logistica)
     declare logistica:Logistica

     @ForeignKey(()=>Programacion)
     declare programacionId:number

     @BelongsTo(()=>Programacion)
     declare programacion:Programacion

     @ForeignKey(()=>Operaciones)
     declare operacionesId:number

     @BelongsTo(()=>Operaciones)
     declare Operaciones:Operaciones

     @ForeignKey(()=>Entidad)
     declare entidadId:number

     @BelongsTo(()=>Entidad)
     declare entidad:Entidad


     @ForeignKey(()=>Municipios)
     declare municipiosId:number

     @BelongsTo(()=>Municipios)
     declare municipios:Municipios

     @HasMany(()=>EstadosTramites,{
              
     
      })
      declare estadosTramites:EstadosTramites

      @HasMany(()=>Trazabilidad,{
              
     
      })
      declare trazabilidad:Trazabilidad


}

export default SolicitudTramites