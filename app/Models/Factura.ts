import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_pago: DateTime

  @column()
  public valor: number

  @column()
  public info: string

  @column()
  public success: boolean

  @column()
  public cuota_id: number

  @belongsTo(() => Cuota, {
    foreignKey: 'cuota_id'
  })
  public cuota: BelongsTo<typeof Cuota>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
