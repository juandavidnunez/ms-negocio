import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'
import Factura from './Factura'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public valor: number

  @column()
  public estado: boolean

  @column()
  public contrato_id: number

  @belongsTo(()=>Contrato, {
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>

  @hasOne(() => Factura, {
    foreignKey: 'cuota_id',
  })
  public factura: HasOne<typeof Factura>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
