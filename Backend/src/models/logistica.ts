import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";

import Transportadora from "./trasnportadora";
import SolicitudTramites from "./solicitudTramites";

@Table({
  tableName: "Logistica",
  timestamps: true
})
export default class Logistica extends Model {

  @Column({
    type: DataType.STRING(50)
  })
  declare numeroGuia: string;


  @Column({
    type: DataType.STRING(50)
  })
  declare destinatario: string;


  @Column({
    type: DataType.DECIMAL(10,2)
  })
  declare valorEnvio: number;


  @Column({
    type: DataType.DATEONLY
  })
  declare fechaProgramacionLogistica: string;


  @Column({
    type: DataType.DATEONLY
  })
  declare fechaEntregaTransportadora: string;


  // 🔑 Foreign Key
  @ForeignKey(() => Transportadora)
  @Column({
    type: DataType.INTEGER
  })
  declare transportadoraId: number;


  // Relación
  @BelongsTo(() => Transportadora)
  declare transportadora: Transportadora;


  @ForeignKey(() => SolicitudTramites)
  @Column({ unique: true })
  declare solicitudTramiteId: number;


  @BelongsTo(() => SolicitudTramites)
  declare solicitudTramites: SolicitudTramites;

}