import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Dueno from './Dueno'

export default class VehiculoDueno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public vehiculo_id: number

  @column()
  public dueño_id: number

  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(() => Dueno, {
    foreignKey: 'dueño_id'
  })
  public dueño: BelongsTo<typeof Dueno>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
