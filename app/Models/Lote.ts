import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Ruta from './Ruta'

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dir_lista_orden_id: number

  @column()
  public ruta_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Ruta,{
    foreignKey: 'ruta_id'
  })
  public ruta: BelongsTo<typeof Ruta>
}
