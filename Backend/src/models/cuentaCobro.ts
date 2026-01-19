import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript"
import SolicitudTramites from "./solicitudTramites"

@Table({ tableName: "CuentaCobros" })
class CuentaCobros extends Model {

  @Column({ type: DataType.DECIMAL(10,2) })
  declare valorCuentaCobro: number | null

  @Column({ type: DataType.DATEONLY })
  declare fechaRadicacionCuentaCobro: string | null

  @Column({ type: DataType.DATEONLY })
  declare fechaMaximaPagoCuentaCobro: string | null

  @Column({ type: DataType.DATEONLY })
  declare fechaPagoCuentaCobro: string | null

  @Column({ type: DataType.DATEONLY })
  declare fechaRecibidaCuentaCobroTramitador: string | null

  @Column({ type: DataType.STRING(20) })
  declare numeroCuentaCobro: string | null

  // 🔹 FK real
  @ForeignKey(() => SolicitudTramites)
  @Column({ unique: true })
  declare solicitudTramiteId: number

  @BelongsTo(() => SolicitudTramites)
  declare solicitudTramite: SolicitudTramites
}

export default CuentaCobros
