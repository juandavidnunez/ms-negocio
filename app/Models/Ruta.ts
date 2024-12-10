import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Contrato from './Contrato'
import Lote from './Lote'
import Direccion from './Direccion'

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vehiculo_id: number

  @column()
  public contrato_id: number

  @hasMany(() => Lote, {
    foreignKey: 'ruta_id',
  })
  public lotes: HasMany<typeof Lote>


  @manyToMany(() => Direccion, {
    pivotTable: 'dirlistaordenes',
    localKey: 'id',
    pivotForeignKey: 'ruta_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'direccion_id',
  })
  public direcciones: ManyToMany<typeof Direccion>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
