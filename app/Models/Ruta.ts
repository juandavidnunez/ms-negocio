import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Contrato from './Contrato'
import Lote from './Lote'

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vehiculo_id: number

  @column()
  public contrato_id: number

  @column()
  public direccion_inicial_id: number

  @column()
  public direccion_final_id: number

  @hasMany(() => Lote, {
    foreignKey: 'ruta_id',
  })
  public lotes: HasMany<typeof Lote>

  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculo_id',
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(() => Contrato, {
    foreignKey: 'contrato_id',
  })
  public contrato: BelongsTo<typeof Contrato>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
