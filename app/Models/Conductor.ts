import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import VehiculoConductor from './VehiculoConductor'
import Turno from './Turno'
import Usuario from './Usuario'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public fecha_nacimiento: DateTime

  @column()
  public cedula: string

  @column()
  public security_id: string // Id for the user in users

  @hasOne(() => VehiculoConductor, {
    foreignKey: 'vehiculo_id'
  })
  public vehiculoConductor: HasOne<typeof VehiculoConductor>

  @hasMany(() => Turno, {
    foreignKey: 'vehiculo_id'
  })
  public turno: HasMany<typeof Turno>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
