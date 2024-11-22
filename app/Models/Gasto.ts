import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Factura from './Factura'

export default class Gasto extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public cantidad:number

  @column()
  public dueño_id: number

  @column()
  public conductor_id: number

  @column()
  public servicio_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Factura, {
    foreignKey: 'gasto_id'
  })
  public personaNatural: HasOne<typeof Factura>
}
