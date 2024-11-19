import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Producto from './Producto'
import Contrato from './Contrato'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public fecha_nacimiento: DateTime

  @column({isPrimary: true})
  public cedula: string

  @column()
  public user_id: number // Id for the user in users

  @belongsTo(() => Usuario, {
    foreignKey: 'user_id',
  })
  public usuario: BelongsTo<typeof Usuario>

  @hasMany(()=>Producto,{
    foreignKey: 'cliente_id'
  })
  public producto: HasMany<typeof Producto>

  @hasMany(()=>Contrato,{
    foreignKey: 'cliente_id'
  })
  public contrato: HasMany<typeof Contrato>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
