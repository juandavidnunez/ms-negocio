import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import VehiculoDueno from './VehiculoDueno'
import Usuario from './Usuario'

export default class Dueno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public email: string

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

  @hasMany(() => VehiculoDueno, {
    foreignKey: 'vehiculo_id'
  })
  public vehiculoDueno: HasMany<typeof VehiculoDueno>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
