import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RutaDireccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public direccion_id: number

  // @column()
  // public ruta_id: number

  @column()
  public lote_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
