import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import DirListaOrden from './DirListaOrden'

export default class Anotacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public fecha: DateTime

  @column()
  public descripcion: string

  @column()
  public dir_lista_orden_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => DirListaOrden,{
    foreignKey: 'dir_lista_orden_id'
  })
  public dirListaOrden: BelongsTo<typeof DirListaOrden>
}
