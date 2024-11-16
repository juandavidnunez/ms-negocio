import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import PersonaNatural from './PersonaNatural'

export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public razon_social: string

  @column()
  public nit: string

  @column()
  public contacto: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => PersonaNatural, {
    foreignKey: 'empresa_id'
  })
  public personaNatural: HasOne<typeof PersonaNatural>
}
