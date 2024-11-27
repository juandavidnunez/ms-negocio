import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import VehiculoDueno from './VehiculoDueno'
import Vehiculo from './Vehiculo'

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
  public security_id: string // Id for the user in users

  @hasMany(() => VehiculoDueno, {
    foreignKey: 'vehiculo_id'
  })
  public vehiculoDueno: HasMany<typeof VehiculoDueno>

  @manyToMany(() => Vehiculo, {
    pivotTable: 'vehiculo_duenos',
    localKey: 'id',
    pivotForeignKey: 'dueno_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'vehiculo_id'
  })
  public vehiculos: ManyToMany<typeof Vehiculo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
