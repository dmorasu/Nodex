import {
  Table,
  Column,
  Model,
  DataType,
  HasMany
} from "sequelize-typescript";

import Logistica from "./logistica";

@Table({
  tableName: "Transportadora",
  timestamps: true
})
export default class Transportadora extends Model {

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  nombreTransportadora!: string;

  @HasMany(() => Logistica)
  logistica!: Logistica[];
}