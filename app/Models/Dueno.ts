import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import VehiculoDueno from './VehiculoDueno'

export default class Dueno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public fecha_nacimiento: Date

  @column({isPrimary: true})
  public cedula: string

  @hasMany(() => VehiculoDueno, {
    foreignKey: 'vehiculo_id'
  })
  public vehiculoDueno: HasMany<typeof VehiculoDueno>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
