import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Ruta from './Ruta'

export default class Contrato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cliente_id: number

  @column()
  public fecha_creacion: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}